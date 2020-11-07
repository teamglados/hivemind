from hivemind.http.http import *
from hivemind.services import services
from hivemind.config import *
import asyncio
from sqlalchemy.sql import select

app = create_api_app(public=('/ping', '/test', '/login', "/questions/list", "/hints/list", "/hints/add", "/hints/vote"))

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
    user_id = int(request.ctx.params.get('user_id'))
    question_id = int(request.ctx.params.get('question_id'))
    result = await services.is_question_active_among_users(request.ctx.conn, user_id, question_id)
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

@app.route('/questions/list', methods=['GET'])
async def api_method_get_questions(request):
    questions = await services.get_questions(
        request.ctx.conn,
        int(request.ctx.params.get('user_id'))
    )
    return questions

@app.route('/users/question', methods=['GET'])
async def api_method_user_active_question(request):
    user_id = int(request.ctx.params.get('user_id'))
    question_id = int(request.ctx.params.get('question_id'))
    await services.activate_question_for_user(request.ctx.conn, user_id, question_id)
    return None


@app.route('/hints/add', methods=['GET'])
async def api_method_add_hint(request):
    user_id = int(request.ctx.params.get('user_id'))
    question_id = int(request.ctx.params.get('question_id'))
    value = request.ctx.params.get('value')

    return await services.add_hint(request.ctx.conn, user_id, question_id, value)

@app.route('/hints/list', methods=['GET'])
async def api_method_get_hints(request):
    user_id = int(request.ctx.params.get('user_id'))
    question_id = int(request.ctx.params.get('question_id'))
    return await services.get_hints(request.ctx.conn, user_id, question_id)

@app.route('/hints/vote', methods=['GET'])
async def api_method_hints_vote(request):
    hint_id = int(request.ctx.params.get('hint_id'))
    user_id = int(request.ctx.params.get('user_id'))
    vote_type = request.ctx.params.get('vote_type').lower()
    return await services.vote_hint(request.ctx.conn, user_id, hint_id, vote_type)

if __name__ == '__main__':
    app.run(
        access_log=True,
        debug=True,
        host=HTTP_HOST,
        port=HTTP_PORT
    )
