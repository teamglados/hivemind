from hivemind.http.auth import *
from hivemind.runtime import *
from datetime import datetime
import sanic_limiter
import sanic
import json

def get_uri_params(**kwargs):
    return '&'.join([
        f'{k}={v}' for k, v in kwargs.items()
    ])

def get_request_params(request):
    return {
        k: v[0] for k, v in request.args.items()
    }

def get_request_origin(request):
    try:
        return request.headers['X-Forwarded-For']
    except KeyError:
        if hasattr(request, 'remote_addr'):
            return request.remote_addr
        else:
            return request.ip

def get_json_string(obj, pretty=False):
    '''
    Returns json string from object of serializable type.

    @param obj: Serializable object
    @param pretty: If true, will return pretty json
    '''
    def converter(o):
        if isinstance(o, datetime):
            return o.isoformat(timespec='milliseconds')
        if isinstance(o, timedelta):
            return o.total_seconds()
        return o.__str__()
    if pretty is True:
        return json.dumps(obj, indent=2, sort_keys=True, default=converter)
    return json.dumps(obj, default=converter)

def get_api_response(request, **kwargs):
    return {
        'method': request.path,
        'time': datetime.now(),
        'result': None,
        'error': None,
        **kwargs
    }

def get_api_result_json(result):
    return sanic.response.HTTPResponse(
        get_json_string(result),
        content_type='application/json'
    )

def create_api_limit_handler(app, limit=1):
    return sanic_limiter.Limiter(
        app,
        key_func=get_request_origin,
        global_limits=[f'{limit} per second']
    ).limit

def create_api_error_handler():
    class handler(sanic.handlers.ErrorHandler):
        def default(self, request, exception):
            super().default(request, exception)
            return dict(
                error=dict(
                    type=type(exception).__name__,
                    message=str(exception)
                )
            )
    return handler()

def create_api_app(name='api', limit=5, public=tuple()):
    app = sanic.Sanic(name=name)

    app.public = public
    app.logger = sanic.log.logger
    app.limiter = create_api_limit_handler(app, limit)

    app.error_handler = create_api_error_handler()
    app.error_handler.add(
        sanic.exceptions.NotFound,
        lambda r, e: sanic.response.empty(status=404)
    )

    @app.middleware('request')
    async def api_query_params(request):
        request.ctx.params = get_request_params(
            request
        )

    @app.middleware('request')
    async def api_query_session(request):
        request.ctx.conn = await engine.connect().__aenter__()

    @app.middleware('request')
    async def api_auth(request):
        if request.path not in request.app.public:
            if (token := request.ctx.params.get('token')) is None:
                token = request.headers.get('token')
            try:
                assert token is not None, 'authentication token is missing'
                # TODO: Validate JWT_ADMIN_SECRET, JWT_SECRET
                # TODO: Decode token and set user id
                #jwt_auth_validate(token, request.path)
            except AssertionError as e:
                raise sanic.exceptions.Unauthorized(str(e))
            except Exception as e:
                raise ValueError('invalid token format')

    @app.middleware('response')
    async def api_result_json(request, result):
        try:
            response = get_api_response(request)
            if isinstance(result, sanic.response.HTTPResponse):
                return result
            elif isinstance(result, dict):
                error = result.get('error')
                if error is None:
                    response['result'] = result
                response['error'] = error
            else:
                response['result'] = result
            return get_api_result_json(response)
        except AttributeError:
            return result

    @app.middleware('response')
    async def api_result_json(request, result):
       await request.ctx.conn.close()

    return app
