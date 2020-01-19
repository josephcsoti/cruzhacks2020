import datetime

import requests
response = requests.post('https://events-api.notivize.com/applications/c16b7764-5233-4063-bd6a-43493114d6c9/event_flows/1d1b7cb8-0b39-4c0a-b645-f4639592d747/events',
    json={
        "hours": 9,
        "name": "Joseph",
        "person": "16618277275",
        "provider": "Netflix",
        "user_data": datetime.datetime.now().microsecond
    })

print(response)