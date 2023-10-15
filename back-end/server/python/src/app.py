from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route('/api/files/upload', methods=['POST'])
def upload_file():
    
    user_id = request.form.get('user_id')
    template = request.form.get('template')
    print(user_id, template, request.files['file'])
    
    if user_id is None or template is None:
        return jsonify({'error': 'Dados incompletos no corpo da solicitação'}), 400
    
    if 'file' not in request.files:
        return 'Nenhum arquivo foi enviado', 400

    file = request.files['file']

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
