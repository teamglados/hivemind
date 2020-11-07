from hivemind.http.http import *
from hivemind.services import *
from hivemind.config import *
from hivemind.test import *
import asyncio

app = create_api_app(public=('/ping', '/test', '/login' ))

@app.listener('before_server_start')
async def open_database(app, loop):
    app.logger.info('Database connection open')

@app.listener('after_server_stop')
async def close_database(app, loop):
    app.logger.info('Database connection close')

@app.route('/ping', methods=['GET', 'POST'])
@app.limiter('1 per second')
async def api_method_ping(request):
    return dict(
        ok=1
    )

@app.route('/test', methods=['GET', 'POST'])
async def api_method_test(request):
    query = users.insert().values(name=request.ctx.params.get('name'))
    async with engine.connect() as conn:
        result = await conn.execute(query)
        return result.fetchall()

@app.route('/login', methods=['GET', 'POST'])
@app.limiter('1 per second')
async def api_method_auth(request):
    await asyncio.sleep(1)
    name = request.ctx.params.get('name')
    user = dict()
    token = jwt_auth_create(scopes=[
        '/question',
        '/question/list',
        '/question/update'
    ], data=dict(
        name=user.name,
        uid=user.id
    ))
    return token

@app.route('/question', methods=['GET'])
async def api_method_question(request):
    raise NotImplementedError(
        'the requested API method is not implemented'
    )

@app.route('/question/list', methods=['GET'])
async def api_method_question_list(request):
    raise NotImplementedError(
        'the requested API method is not implemented'
    )

@app.route('/question/update', methods=['POST'])
async def api_method_question_update(request):
    raise NotImplementedError(
        'the requested API method is not implemented'
    )

@app.route('/answer/create', methods=['POST'])
async def api_method_answer_create(request):
    raise NotImplementedError(
        'the requested API method is not implemented'
    )

@app.route('/message/create', methods=['POST'])
async def api_method_message_create(request):
    raise NotImplementedError(
        'the requested API method is not implemented'
    )

if __name__ == '__main__':
    app.run(
        access_log=True,
        debug=True,
        host=HTTP_HOST,
        port=HTTP_PORT
    )
