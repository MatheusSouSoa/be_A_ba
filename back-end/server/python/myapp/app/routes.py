from flask import request, jsonify
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

@app.route('/teste', methods=['get'])
def teste():
    usuario = {
        'nome': 'Matheus'
    }
    return jsonify(usuario)
