from hivemind.models import *
import types

def create_user(sess, *args, **kwargs):
    user = User(*args, **kwargs)
    sess.add(user)
    sess.commit()
    return user
