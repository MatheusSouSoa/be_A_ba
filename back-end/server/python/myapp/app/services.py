# services.py
from app.repositories import FilesRepository
import json
import pandas as pd
import os
from datetime import datetime
from flask import request, jsonify

class FileService:
    @staticmethod
    def upload_file(user_id, template, campos):
        user_id = request.form.get('user_id')
        template = request.form.get('template')
        campos = request.form.get('campos')
        # print(user_id, "\n", template, "\n",campos, "\n",request.files['file'])
        # print("\n\nARQUIVO: ",request.files['file'])
        # print("\n\nARQUIVO: ",request.files.get('file'))
        file = request.files.get('file')
        print(file)
        
        # if user_id is None or template is None:
        #     return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400
        
        # if 'file' not in request.files:
        #     return 'Nenhum arquivo foi enviado', 400
        # if not template:
        #     return jsonify({'error': 'O campo de template é obrigatório'}), 400

        # try:
        #     template_data = json.loads(template)
        # except json.JSONDecodeError:
        #     return jsonify({'error': 'O campo de template não é um JSON válido'}), 400
        
        # file = request.files.get('file')
        
        # file_extension = file.filename.split('.')[-1].lower()

        # if file_extension != template_data.get('formato', '').lower():
        #     return jsonify({'error': 'A extensão do arquivo não corresponde ao formato do template'}), 400


        # if file.filename == '':
        #     return 'Nome de arquivo vazio', 400

        # if file:
        #     if file.filename.endswith('.csv'):
        #         df = pd.read_csv(file)
        #     elif file.filename.endswith('.xlsx'):
        #         df = pd.read_excel(file)
        #     else:
        #         return 'Formato de arquivo não suportado', 400
            
        user_directory = os.path.join('data', 'users', user_id, 'files')
        #     if not os.path.exists(user_directory):
        #         os.makedirs(user_directory)

        #     current_time = datetime.now()
        #     timestamp = current_time.strftime('%Y%m%d%H%M%S')
        #     filename = f'{timestamp}_{file.filename}'  
            
        #     df['hora_criacao'] = timestamp
            
            #qtd_linhas = len(df)

        file_path = os.path.join(user_directory, file.filename)
        print('file_path: %s' % file_path)

        file.save(file_path)
        download_path = f'/api/files/download/{user_id}/{file.filename}'

        response_data = {
            'download_path': download_path,
            # 'dataframe': df.to_dict(orient='records'),
            # 'qtd_linhas': qtd_linhas
        }
            
            # print("CHEGOU AQUI PORRA: ", response_data)
            
        # FilesRepository.save_file_details(file.filename, template, file_path, timestamp, qtd_linhas)
        return response_data
