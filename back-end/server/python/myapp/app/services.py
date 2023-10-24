# services.py
from app.repositories import FilesRepository
import json
import pandas as pd
import os
from datetime import datetime
from flask import request, jsonify
import shutil

class FileService:
    @staticmethod
    def upload_file(user_id, template, campos):
        user_id = request.form.get('user_id')
        template = request.form.get('template')
        campos = request.form.get('campos')

        file = request.files.get('file')
        print(file)
        
        if user_id is None or template is None:
            return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400
        
        if 'file' not in request.files:
            return 'Nenhum arquivo foi enviado', 400
        if not template:
            return jsonify({'error': 'O campo de template é obrigatório'}), 400

        try:
            template_data = json.loads(template)
        except json.JSONDecodeError:
            return jsonify({'error': 'O campo de template não é um JSON válido'}), 400
        
        file = request.files.get('file')
        
        file_extension = file.filename.split('.')[-1].lower()

        if file_extension != template_data['formato']:
            print("Parou na verificação de extensao")
            return {'message': 'A extensão do arquivo não corresponde ao formato do template'}, 400
        
        print("Template: ", template_data['formato'])
        print("File: ", file_extension)

        if file.filename == '':
            return 'Nome de arquivo vazio', 400

        if file:
            if file.filename.endswith('.csv'):
                df = pd.read_csv(file)
            elif file.filename.endswith('.xlsx'):
                df = pd.read_excel(file)
            else:
                return 'Formato de arquivo não suportado', 400
            
            current_time = datetime.now()
            timestamp = current_time.strftime('%Y%m%d%H%M%S')
            filename = f'{timestamp}_{file.filename}'  
                
            user_directory = os.path.join('data', 'users', user_id, 'files', timestamp)
            if not os.path.exists(user_directory):
                os.makedirs(user_directory)

                
            df['hora_criacao'] = timestamp
            
            qtd_linhas = 10

            file_path = os.path.join(user_directory, file.filename)
            print('file_path: %s' % file_path)

            if file.filename.endswith('.csv'):
                df.to_csv(file_path, index=False)
            elif file.filename.endswith('.xlsx'):
                df.to_excel(file_path, index=False, engine='openpyxl')
            
            #file.save(file_path)
            download_path = f'/api/files/download/{user_id}/{file.filename}'

            response_data = {
                'download_path': download_path,
                'dataframe': df.to_dict(orient='records'),
                'qtd_linhas': qtd_linhas
            }
                
            FilesRepository.save_file_details(file.filename, template, f'{user_id}/{timestamp}/{file.filename}', timestamp, qtd_linhas, user_id)
            return response_data

    @staticmethod
    def delete_file(user_id, filename, file_id, timestamp):
        DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á bá/back-end/server/python/myapp/data/users'
        user_directory = os.path.join(DIRETORIO, str(user_id), 'files', str(timestamp))
        file_path = os.path.join(user_directory, filename)
        print(file_path)
        print(user_directory)
        # return {'message': DIRETORIO}, 200

        if os.path.exists(file_path):
            drop_success = FilesRepository.drop_table("Uploads", file_id)
            if drop_success:
                shutil.rmtree(user_directory)
                return {'message': 'Arquivo excluído com sucesso'}, 200
            return {'message': 'Erro ao excluir arquivo'}, 500
        else:
            return {'error': 'Arquivo não encontrado', 'caminho': user_directory}, 404