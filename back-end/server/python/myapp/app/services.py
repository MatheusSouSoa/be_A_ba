# services.py
from app.repositories import FilesRepository
import json
import pandas as pd
import os
from datetime import datetime
from flask import request, jsonify
import shutil
import xlrd

class FileService:
    @staticmethod
    def upload_file(user_id, template, campos):
        user_id = request.form.get('user_id')
        template = request.form.get('template')
        campos = request.form.get('campos')
        
        file = request.files.get('file')
        
        if user_id is None or template is None:
            return {'message': 'Dados incompletos no corpo da solicitação'}, 400
        
        if 'file' not in request.files:
            return 'Nenhum arquivo foi enviado', 400
        if not template:
            return {'message': 'O campo de template é obrigatório'}, 400
        if not campos:
            return {'message': 'Os campos do template são obrigatórios'}, 400


        try:
            template_data = json.loads(template)
        except json.JSONDecodeError:
            return {'message': 'O campo de template não é um JSON válido'}, 400
        
        
        template_columns = template_data.get('campos', 0)
        
        file = request.files.get('file')
        
        file_extension = file.filename.split('.')[-1].lower()

        if file_extension != template_data['formato']:
            return {'message': 'A extensão do arquivo não corresponde ao formato do template'}, 400


        if file.filename == '':
            return 'Nome de arquivo vazio', 400

        if file:
            if file.filename.endswith('.csv'):
                df = pd.read_csv(file)
            elif file.filename.endswith('.xlsx') or file.filename.endswith('.xls'):
                df = pd.read_excel(file)
            else:
                return 'Formato de arquivo não suportado', 400

            try:
                campos_data = json.loads(campos)

                if sorted(map(str.lower, df.columns)) != sorted([col['nome'].lower() for col in campos_data['data']]):
                    return {'message': 'Os nomes das colunas no arquivo não correspondem ao template'}, 400

                tipo_dado_mapping = {
                    'texto': 'object',
                    'inteiro': 'int64',
                    'decimal': 'float64',
                    'booleano': 'bool',
                    'data': 'datetime64[ns]'
                }
                
                # print("\ncampos_data: ", campos_data)

                expected_data_types = {col['nome']: col['tipo'] for col in campos_data['data']}
                # print("expected: ", expected_data_types)
                
                for col_name, expected_dtype in expected_data_types.items():
                    if col_name in df.columns:
                        mapped_dtype = tipo_dado_mapping.get(expected_dtype, 'object')
                        print("aqui: ",df[col_name].dtype.name, mapped_dtype)
                        if mapped_dtype == "datetime64[ns]":
                            print("Começa aqui: ")
                            converted_column = pd.to_datetime(df[col_name], errors='coerce')
                            print(converted_column)
                            print(pd.isna(converted_column).any())
                            if pd.isna(converted_column).any():
                                print("Achou")
                                mensagem =  f'O tipo de dados da coluna {col_name.upper()} do arquivo não é data e não corresponde ao tipo de dados no template ({expected_dtype}) do template'
                                erro_encontrado = True
                                break
                        else:
                            if df[col_name].dtype.name != mapped_dtype:
                                return {'message': f'O tipo de dados da coluna {col_name.upper()} do arquivo não corresponde ao tipo de dados no template ({expected_dtype}) do template'}, 400
                            df[col_name] = df[col_name].astype(mapped_dtype)
                
                if erro_encontrado:
                    return {'message': mensagem}, 400
                        
                for col in campos_data['data']:
                    col_nome = col['nome']
                    if col['tipo'] == "data" and pd.to_datetime(df[col_nome], errors='coerce'): 
                        # df[campo.nome] = 
                        return {'message': f'O tipo de dados da coluna {col_name.upper()} tipo data não é uma data ({expected_dtype}) do template'}, 400
                        
                    obrigatorio = not col['nulo']
                    print(obrigatorio)
                    print("aqui 1234567", df[col_nome].isna().any())
                    print("aqui 1234567987654", df[col_nome].empty)
                    if col_nome in df.columns:
                        print("tem teste")
                        if obrigatorio == True and (df[col_nome].isnull().any() or df[col_nome].empty):
                            print("tem2")
                            mensagem = f"A coluna '{col_nome}' é obrigatória, mas possui valores nulos ou em branco."
                            print(mensagem)
                            erro_encontrado = True
                            break

                if erro_encontrado:
                    return {'message': mensagem}, 400


                print("\nCamposdata: ",{col['nome']: col['tipo'] for col in campos_data['data']})
                print("Df : \n", df.dtypes)

            except json.JSONDecodeError as e:
                print(f"Erro ao analisar campos como JSON: {e}")
            except Exception as e:
                print(f"Erro ao comparar colunas: {e}")



            if len(df.columns) != template_columns:
                return {'message': 'O número de colunas no arquivo não corresponde ao template'}, 400
            
            
            current_time = datetime.now()
            timestamp = current_time.strftime('%Y%m%d%H%M%S')
            filename = f'{timestamp}_{file.filename}'  
                
            user_directory = os.path.join('data', 'users', user_id, 'files', timestamp)
            if not os.path.exists(user_directory):
                os.makedirs(user_directory)

                
            # df['hora_criacao'] = timestamp
            
            qtd_linhas = 10

            file_path = os.path.join(user_directory, file.filename)
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