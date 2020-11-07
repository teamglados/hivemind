from hivemind.http.http import *
from hivemind.config import *
import asyncio

app = create_api_app(public=('/ping', ))

@app.listener('before_server_start')
async def open_database(app, loop):
    app.logger.info('Database connection open')

@app.listener('after_server_stop')
async def close_database(app, loop):
    app.logger.info('Database connection close')

@app.route('/auth', methods=['GET', 'POST'])
@app.limiter('1 per second')
async def api_method_auth(request):
    await asyncio.sleep(1)
    return jwt_auth_create(scopes=[
        '/test',
    ])

@app.route('/ping', methods=['GET', 'POST'])
@app.limiter('1 per second')
async def api_method_ping(request):
    return dict(
        ok=1
    )

@app.route('/test', methods=['GET'])
async def api_method_test(request):
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
