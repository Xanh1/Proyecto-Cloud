def json_response(msg, code, context):
    return {
        'msg'  : msg,
        'code' : code,
        'context' : context,
    }