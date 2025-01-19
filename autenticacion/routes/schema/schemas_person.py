save_person = {
    'type' : 'object',
    'propierties' : {
        'name': {'type' : 'string'},
        'dni': {'type' : 'string'},
        'last_name': {'type' : 'string'},
        'email': {'type' : 'string'},
        'password': {'type' : 'string'}
    },
    'required' : ['name','dni', 'last_name','email', 'password']
}

edit_person = {
    'type' : 'object',
    'propierties' : {
        'external' : {'type': 'string'},
        'name': {'type' : 'string'},
        'last_name': {'type' : 'string'},
        'email': {'type' : 'string'},
        'password': {'type' : 'string'},
        'old_password' : {'type':'string'}
    },
    'required' : ['name', 'last_name', 'external', 'email','password', 'old_password']
}

edit_person_email = {
    'type' : 'object',
    'propierties' : {
        'external' : {'type': 'string'},
        'email': {'type' : 'string'},
        'password': {'type' : 'string'}
    },
    'required' : ['email','password', 'external']
}

change_state_person = {
    'type' : 'object',
    'propierties' : {
        'external' : {'type': 'string'},
    },
    'required' : ['external']
}