
https://console.cloud.google.com/apis/credentials/oauthclient/212795350671-vvqm1h8v4j4roedmvep019gmpgrjb7aa.apps.googleusercontent.com?project=empyrean-kit-428211-j2

import logging
from flask import Flask

flask shell

pip install flask-debugtoolbar


Log Request Data:
@app.route('/data', methods=['POST'])
def data():
    data = request.json
    app.logger.debug(f'Request Data: {data}')
    return 'Data received'

Inspect Response Data:
@app.route('/response')
def response():
    response = make_response('Response data')
    response.headers['X-Custom-Header'] = 'Value'
    app.logger.debug(f'Response Headers: {response.headers}')
    return response
