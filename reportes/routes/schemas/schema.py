create_report = {
    'type': 'object',
    'properties': {
        'subject': {'type': 'string'},
        'description': {'type': 'string'},
        'user': {'type': 'integer'},
    },
    'required': ['subject', 'description', 'user']
}
