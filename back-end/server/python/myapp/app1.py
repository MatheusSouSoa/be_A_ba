import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

def validate_fields(file, template_data):
    df = pd.read_json(file)
    file_fields = df.columns.tolist()

    template_fields = [campo['nome'] for campo in template_data['data']]

    if len(file_fields) != len(template_fields):
        return False

    for campo in file_fields:
        if campo not in template_fields:
            return False

    return True

@app.route('/teste', methods=['get'])
def teste():
    usuario = {
        'nome': 'Matheus'
    }
    return jsonify(usuario)

@app.route('/api/files/upload', methods=['POST'])
def upload_file():
    
    user_id = request.form.get('user_id')
    template = request.form.get('template')
    campos = request.form.get('campos')
    print(user_id, "\n", template, "\n",campos, "\n",request.files['file'])
    
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
    
    file = request.files['file']
    
    file_extension = file.filename.split('.')[-1].lower()

    if file_extension != template_data.get('formato', '').lower():
        return jsonify({'error': 'A extensão do arquivo não corresponde ao formato do template'}), 400


    if file.filename == '':
        return 'Nome de arquivo vazio', 400

    if file:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
        else:
            return 'Formato de arquivo não suportado', 400
        
        user_directory = os.path.join('data', 'users', user_id, 'files')
        if not os.path.exists(user_directory):
            os.makedirs(user_directory)

        current_time = datetime.now()
        timestamp = current_time.strftime('%Y%m%d%H%M%S')
        filename = f'uploaded_file_{timestamp}.csv'  

        file_path = os.path.join(user_directory, filename)

        file.save(file_path)
        download_path = f'/api/files/download/{user_id}/{filename}'

        response_data = {
            'download_path': download_path,
            'dataframe': df.to_json()
        }
        return jsonify(response_data)
    
if __name__ == '__main__':
    app.run(debug=True)
