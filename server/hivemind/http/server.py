from hivemind.http.http import *
from hivemind.http.auth import get_user_id_from_token
from hivemind.services import services
from hivemind.config import *
import asyncio
from sqlalchemy.sql import select
from sanic_cors import CORS, cross_origin
from uuid import UUID

endpoint_tuple = (
    "/ping",
    "/test",
    "/login",
    "/questions/list",
    "/hints/list",
    "/hints/add",
    "/hints/vote",
    "/answers/add",
)

app = create_api_app(public=endpoint_tuple)
CORS(app, resources={"*": {"origins": "*"}})


@app.listener("before_server_start")
async def open_database(app, loop):
    app.logger.info("Database connection open")


@app.listener("after_server_stop")
async def close_database(app, loop):
    app.logger.info("Database connection close")


@app.route("/ping", methods=["GET", "POST"])
@app.limiter("1 per second")
async def api_method_ping(request):
    return dict(ok=1)


@app.route("/test", methods=["GET", "POST"])
async def api_method_test(request):
    user_id = get_user_id_from_token(request)
    question_id = int(request.ctx.params.get("question_id"))
    result = await services.is_question_active_among_users(
        request.ctx.conn, user_id, question_id
    )
    return result


@app.route("/login", methods=["GET", "POST"])
@app.limiter("1 per second")
async def api_method_auth(request):
    name = request.ctx.params.get("name")
    user_id = await services.create_user(request.ctx.conn, name)

    token = jwt_auth_create(
        scopes=list(endpoint_tuple), data=dict(name=name, uid=user_id)
    )
    return token


@app.route("/questions/list", methods=["GET"])
async def api_method_get_questions(request):
    user_id = get_user_id_from_token(request)
    questions = await services.get_questions(request.ctx.conn, user_id)
    return questions


@app.route("/users/question", methods=["GET"])
async def api_method_user_active_question(request):
    user_id = get_user_id_from_token(request)
    question_id = int(request.ctx.params.get("question_id"))
    await services.activate_question_for_user(request.ctx.conn, user_id, question_id)
    return None


@app.route("/hints/add", methods=["GET"])
async def api_method_add_hint(request):
    user_id = get_user_id_from_token(request)
    question_id = int(request.ctx.params.get("question_id"))
    value = request.ctx.params.get("value")

    return await services.add_hint(request.ctx.conn, user_id, question_id, value)


@app.route("/hints/list", methods=["GET"])
async def api_method_get_hints(request):
    user_id = get_user_id_from_token(request)
    question_id = int(request.ctx.params.get("question_id"))
    return await services.get_hints(request.ctx.conn, user_id, question_id)


@app.route("/hints/vote", methods=["GET"])
async def api_method_hints_vote(request):
    hint_id = int(request.ctx.params.get("hint_id"))
    user_id = get_user_id_from_token(request)
    vote_type = request.ctx.params.get("vote_type").lower()
    return await services.vote_hint(request.ctx.conn, user_id, hint_id, vote_type)


@app.route("/answers/add", methods=["GET"])
async def api_method_add_answer(request):
    user_id = get_user_id_from_token(request)
    question_id = int(request.ctx.params.get("question_id"))
    value = request.ctx.params.get("value")
    return await services.add_answer(request.ctx.conn, user_id, question_id, value)


@app.route("/users", methods=["GET"])
async def api_method_get_user(request):
    user_id = get_user_id_from_token(request)
    return await services.get_user(request.ctx.conn, user_id)


@app.route("/discuss/start", methods=["GET"])
async def api_method_start_discussion(request):
    user_id = get_user_id_from_token(request)
    question_id = int(request.ctx.params.get("question_id"))
    result =  await services.get_discussion_id(request.ctx.conn, user_id, question_id)
    return {"discussion_id": str(result)}


@app.route("/discuss/close", methods=["GET"])
async def api_method_close_discussion(request):
    user_id = get_user_id_from_token(request)
    result =  await services.close_discussion(request.ctx.conn, user_id)
    return ""


@app.route("/message/add", methods=["GET"])
async def api_method_add_message(request):
    user_id = get_user_id_from_token(request)
    discussion_id = UUID(request.ctx.params.get("discussion_id"))
    value = request.ctx.params.get("value")
    result =  await services.add_message(request.ctx.conn, user_id, discussion_id, value)
    return {"discussion_id": str(result)}


@app.route("/message/list", methods=["GET"])
async def api_method_list_messages(request):
    user_id = get_user_id_from_token(request)
    discussion_id = UUID(request.ctx.params.get("discussion_id"))
    return await services.list_messages(request.ctx.conn, discussion_id)


@app.route("/message/vote", methods=["GET"])
async def api_method_vote_message(request):
    user_id = get_user_id_from_token(request)
    message_id = int(request.ctx.params.get("message_id"))
    return await services.vote_message(request.ctx.conn, message_id)


if __name__ == "__main__":
    app.run(access_log=True, debug=True, host=HTTP_HOST, port=HTTP_PORT)

