import os
from flask import request, jsonify, send_from_directory, send_file
from app import app
from app.services import FileService

@app.route('/api/files/upload', methods=['POST'])
def upload_file():
    user_id = request.form.get('user_id')
    template = request.form.get('template')
    campos = request.form.get('campos')
    # uploaded_file = request.files['file']

    if not user_id or not template:
        return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400

    response = FileService.upload_file(user_id, template, campos)
    response_data = {
    'result': response,
    'status': 200
    }
    return jsonify(response_data)

@app.route('/api/files/download/<path:user_id>/<path:filename>', methods=['GET'])
def download_file(user_id, filename):
    DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á bá/back-end/server/python/myapp/data/users'
    user_directory = os.path.join(DIRETORIO, user_id, 'files')
    return send_from_directory(user_directory, filename, as_attachment=True)


@app.route('/teste', methods=['get'])
def teste():
    usuario = {
        'nome': 'Matheus'
    }
    return jsonify(usuario)
