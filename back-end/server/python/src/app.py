import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

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

        return df.to_json()

if __name__ == '__main__':
    app.run(debug=True)
