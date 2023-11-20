from datetime import datetime, timedelta
import pandas as pd
import os
from flask import request, jsonify, send_from_directory, send_file
from app import app
from app.services import FileService
from app.templateService import TemplateService, create_directory_if_not_exists
from app.DashboardService import DashboardService
from urllib.parse import unquote

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
# @app.route('/api/files/download/<path:user_id>/<path:filename>/<path:dir_name>', methods=['GET'])
def download_file(user_id, filename, dir_name=None):
    if dir_name is None or dir_name == "":
        DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/Bê á Bá/back-end/server/python/myapp/data/users'
        print("1")
    else:
        dir_name_striped = dir_name.strip("/")
        DIRETORIO = f'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/Bê á Bá/back-end/server/python/myapp/data/{dir_name_striped}/users'
        print("2")
    
    print("diretorio: ", DIRETORIO)
    
    user_directory = os.path.join(DIRETORIO, user_id, 'files')
    return send_from_directory(user_directory, filename, as_attachment=True)

@app.route('/api/files/download-dir/<path:user_id>/<path:filename>/<path:dir_name>', methods=['GET'])
def download_file_dir(user_id, filename, dir_name=None):

    print(user_id)
    print(filename.split("/")[0])
    print(dir_name.split("/")[0])
    dir_name_striped = dir_name.split("/")
    print(dir_name_striped)
    print(len(dir_name_striped))
    
    dir = ""
    if len(dir_name_striped) > 2:
        for i in dir_name_striped:
            if i == dir_name_striped[0]:
                continue
            print(i)
            dir = f'{dir}/{i}'
        print(dir)
        DIRETORIO = f'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/Bê á Bá/back-end/server/python/myapp/data/{dir}/users/{user_id}/files/{filename.split("/")[0]}'
    else: 
        DIRETORIO = f'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/back-end/server/python/myapp/data/{dir_name_striped[1]}/users/{user_id}/files/{filename.split("/")[0]}'
    print("2")
    
    print("diretorio: ", DIRETORIO)
    
    user_directory = os.path.join(DIRETORIO)
    print(user_directory)
    print(dir_name.split('/')[0])
    return send_from_directory(user_directory, dir_name_striped[0], as_attachment=True)

@app.route('/api/direct-file-download', methods=['GET'])
def direct_file_download():
    DIRETORIO = r'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/Bê á Bá/back-end/server/python/myapp/data/'
    full_path_param = request.args.get('full_path')

    full_path = full_path_param.strip()

    user_directory = os.path.join(DIRETORIO)

    full_path_components = full_path.split("/")
    
    for path in full_path_components:
        if path == full_path_components[-1]:
            break
        user_directory = os.path.join(user_directory, path)

    user_directory = os.path.normpath(user_directory)

    full_file_path = os.path.join(user_directory, full_path_components[-1])
    if os.path.exists(full_file_path):
        return send_from_directory(user_directory, full_path_components[-1], as_attachment=True)
    else:
        return "Arquivo não encontrado", 404

@app.route('/api/files/delete/<int:file_id>/<int:user_id>/<string:timestamp>/<string:filename>', methods=['DELETE'])
def delete_file2(user_id, filename, file_id, timestamp):
    try:    
        if not user_id or not filename or not file_id or not timestamp:
            return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400

        response = FileService.delete_file(user_id, filename, file_id, timestamp)
        print(response)
        return response
    except Exception as error:
        return jsonify(error)
    
@app.route('/api/files/delete/<int:file_id>', methods=['DELETE'])
def delete_file( file_id):
    file_path = request.args.get('file_path')
    print(file_path)
    try:    
        if not file_path or not file_id:
            return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400

        response = FileService.delete_file(file_path, file_id)
        print(response)
        return response
    except Exception as error:
        return jsonify(error)
    
@app.route('/api/dir/delete/<int:dir_id>', methods=['DELETE'])
def delete_dir( dir_id):
    dir_path = request.args.get('dir_path')
    print(dir_path)
    try:    
        if not dir_path or not dir_id:
            return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400

        response = FileService.delete_dir(dir_path, dir_id)
        print(response)
        return response
    except Exception as error:
        return jsonify(error)

@app.route('/api/templates/download/<int:user_id>/<int:template_id>', methods=['GET'])
def download_template(user_id, template_id):
    DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/Bê á Bá/back-end/server/python/myapp/data/users'
    user_directory = os.path.join(DIRETORIO, str(user_id), 'downloadTemplates', str(template_id))
    
    print("diretorio: ",user_directory)
    create_directory_if_not_exists(user_directory)

    template = TemplateService.upload_template(user_id, template_id)

    template_file = os.path.join(user_directory, f"{template}")

    print(user_directory, f"{template}")
    if os.path.exists(template_file): 
        return send_from_directory(user_directory, f"{template}", as_attachment=True)
    else:
        return jsonify({'error': 'Arquivo não encontrado', 'diretorio': DIRETORIO, 'user_dir': user_directory}), 404

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard():
    try:
        dashboard_data = DashboardService.genDashboardData()
        return jsonify(dashboard_data)
    except Exception as error:
        return jsonify({'error': str(error)}), 500
    
@app.route('/api/arquivos', methods=['GET'])   
def get_files():
    try:
        files = FileService.get_files()
        return files, 200
    except Exception as error:
        return {'error': str(error)}, 500
    
@app.route('/api/dashboard-relatorios', methods=['GET'])
def get_dashboard_relatorios():
    DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/Bê á Bá/back-end/server/python/myapp/relatorios'
    try:
        dashboard_data = DashboardService.genDashboardData()

        max_len = max(len(dashboard_data['total_files_7_dias']),
                      len(dashboard_data['total_por_semana']),
                      len(dashboard_data['total_por_mes']))

        templates_data = {
            '7 dias': dashboard_data['total_files_7_dias'] + [None] * (max_len - len(dashboard_data['total_files_7_dias'])),
            '4 sem': dashboard_data['total_por_semana'] + [None] * (max_len - len(dashboard_data['total_por_semana'])),
            '12 meses': dashboard_data['total_por_mes'] + [None] * (max_len - len(dashboard_data['total_por_mes']))
        }

        max_len_arquivos = max(len(dashboard_data['total_temp_7_dias']),
                               len(dashboard_data['total_temp_4_semanas']),
                               len(dashboard_data['total_temp_12_meses']))

        arquivos_data = {
            '7 dias': dashboard_data['total_temp_7_dias'] + [None] * (max_len_arquivos - len(dashboard_data['total_temp_7_dias'])),
            '4 sem': dashboard_data['total_temp_4_semanas'] + [None] * (max_len_arquivos - len(dashboard_data['total_temp_4_semanas'])),
            '12 meses': dashboard_data['total_temp_12_meses'] + [None] * (max_len_arquivos - len(dashboard_data['total_temp_12_meses']))
        }

        templates_df = pd.DataFrame({k: v for k, v in templates_data.items()})
        arquivos_df = pd.DataFrame({k: v for k, v in arquivos_data.items()})

        data_atual = datetime.now()
        data_formatada = data_atual.strftime("%d-%m-%Y")
        
        excel_path = os.path.join(DIRETORIO, f'relatorio {data_formatada}.xlsx')
        excel_writer = pd.ExcelWriter(excel_path, engine='xlsxwriter')

        templates_df.to_excel(excel_writer, sheet_name='Templates', index=False)
        arquivos_df.to_excel(excel_writer, sheet_name='Arquivos', index=False)

        excel_writer.close()

        return send_file(excel_path, as_attachment=True)
    except Exception as error:
        return jsonify({'error': str(error)}), 500