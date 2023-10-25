import os
from flask import request, jsonify, send_from_directory, send_file
from app import app
from app.services import FileService
from app.templateService import TemplateService, create_directory_if_not_exists

@app.route('/api/files/upload', methods=['POST'])
def upload_file():
    user_id = request.form.get('user_id')
    template = request.form.get('template')
    campos = request.form.get('campos')
    # uploaded_file = request.files['file']


    try:    
        if not user_id or not template:
            return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400

        response = FileService.upload_file(user_id, template, campos)
        # response_data = {
        # 'result': response,
        # 'status': 200
        # }
        return response
    except Exception as error:
        return jsonify(error)

@app.route('/api/files/download/<path:user_id>/<path:filename>', methods=['GET'])
def download_file(user_id, filename):
    DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á bá/back-end/server/python/myapp/data/users'
    user_directory = os.path.join(DIRETORIO, user_id, 'files')
    return send_from_directory(user_directory, filename, as_attachment=True)

@app.route('/api/files/delete/<int:file_id>/<int:user_id>/<string:timestamp>/<string:filename>', methods=['DELETE'])
def delete_file(user_id, filename, file_id, timestamp):
    try:    
        if not user_id or not filename or not file_id or not timestamp:
            return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400

        response = FileService.delete_file(user_id, filename, file_id, timestamp)
        print(response)
        return response
    except Exception as error:
        return jsonify(error)

@app.route('/api/templates/download/<int:user_id>/<int:template_id>', methods=['GET'])
def download_template(user_id, template_id):
    DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á bá/back-end/server/python/myapp/data/users'
    user_directory = os.path.join(DIRETORIO, str(user_id), 'downloadTemplates', str(template_id))
    
    print(user_directory)
    create_directory_if_not_exists(user_directory)

    template = TemplateService.upload_template(user_id, template_id)

    template_file = os.path.join(user_directory, f"{template}")

    print(user_directory, f"{template}")
    if os.path.exists(template_file): 
        return send_from_directory(user_directory, f"{template}", as_attachment=True)
    else:
        return jsonify({'error': 'Arquivo não encontrado', 'diretorio': DIRETORIO}), 404
