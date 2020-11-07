from datetime import datetime
from datetime import timedelta
import jwt
import json
from hivemind.config import JWT_SECRET

_JWT_SECRET = str(JWT_SECRET)

def jwt_encode(payload, secret=_JWT_SECRET):
    return jwt.encode(json.loads(get_json_string(payload)), secret, algorithm='HS256').decode('utf-8')

def jwt_decode(token, secret=_JWT_SECRET):
    return jwt.decode(
        bytes(token, encoding='utf-8'),
        secret,
        algorithms='HS256'
    )

def jwt_auth_create(scopes, data=None, expiry=172800):
    return jwt_encode(dict(
        scopes=scopes,
        data=data,
        expiry=datetime.now() + timedelta(seconds=expiry)
    ))

def jwt_auth_validate(token, scope, secret=_JWT_SECRET):
    decoded = jwt_decode(token, secret=secret)
    assert scope in decoded.get('scopes', []), (
        f'required scope {scope} missing from token scopes'
    )
    assert date_now() < date_from_timestamp(decoded.get('expiry')), (
        f'token is expired'
    )

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


def get_user_id_from_token(request, secret=_JWT_SECRET):
    token = request.ctx.params.get('token')
    if token:
        decoded = jwt_decode(token, secret=secret)
        return decoded.get("data").get("uid")
    # try from query string for local testing
    return request.ctx.params.get('user_id')