from hivemind.http.http import *
from hivemind.services import services
from hivemind.config import *
import asyncio
from sqlalchemy.sql import select

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
    result = await services.get_questions(request.ctx.conn, int(request.ctx.params.get('user_id')))
    return result

@app.route('/login', methods=['GET', 'POST'])
@app.limiter('1 per second')
async def api_method_auth(request):
    await asyncio.sleep(1)
    name = request.ctx.params.get('name')

    token = jwt_auth_create(scopes=[
        '/questions',
    ], data=dict(
        name=user.name,
        uid=user.id
    ))
    return token

@app.route('/questions', methods=['GET'])
async def api_method_question(request):
    questions = await services.get_questions(
        request.ctx.conn,
        int(request.ctx.params.get('user_id'))
    )
    return questions


if __name__ == '__main__':
    app.run(
        access_log=True,
        debug=True,
        host=HTTP_HOST,
        port=HTTP_PORT
    )
