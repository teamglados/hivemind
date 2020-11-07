from datetime import datetime
from datetime import timedelta
import jwt

def jwt_encode(payload, secret=None):
    return jwt.encode(
        payload,
        secret,
        algorithm='HS256'
    ).decode('utf-8')

def jwt_decode(token, secret=None):
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

def jwt_auth_validate(token, scope, secret=None):
    decoded = jwt_decode(token, secret=secret)
    assert scope in decoded.get('scopes', []), (
        f'required scope {scope} missing from token scopes'
    )
    assert date_now() < date_from_timestamp(decoded.get('expiry')), (
        f'token is expired'
    )
