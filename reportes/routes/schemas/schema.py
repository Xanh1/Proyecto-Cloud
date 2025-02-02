create_report = {
    'type': 'object',
    'properties': {
        'subject': {'type': 'string'},
        'description': {'type': 'string'},
        'user': {'type': 'string'},
    },
    'required': ['subject', 'description', 'user']
}

chage_status = {
    'type': 'object',
    'properties': {
        'report': {'type': 'string'}
    },
    'required': ['report']
}