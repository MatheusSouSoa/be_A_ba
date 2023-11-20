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
        dir_name = request.form.get('diretorio') 
        
        if len(dir_name) > 2:
            print("dir 232:", dir_name)
            print("len: ", len(dir_name))
        elif dir_name == "opa":
            print("opa tuduru")
        else:
            print("Diretório vazio ou contém apenas espaços em branco.")
        
        
        erro_encontrado = ""
        erro_encontrado2 = ""
        
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

                expected_data_types = {col['nome']: col['tipo'] for col in campos_data['data']}
                
                for col_name, expected_dtype in expected_data_types.items():
                    if col_name in df.columns:
                        mapped_dtype = tipo_dado_mapping.get(expected_dtype, 'object')
                        if mapped_dtype == "datetime64[ns]":
                            converted_column = pd.to_datetime(df[col_name], errors='coerce')
                            if pd.isna(converted_column).any():
                                mensagem =  f'O tipo de dados da coluna {col_name.upper()} do arquivo não corresponde ao tipo de dados no template ({expected_dtype}) do template'
                                erro_encontrado = True
                                break
                        else:
                            if df[col_name].dtype.name != mapped_dtype:
                                return {'message': f'O tipo de dados da coluna {col_name.upper()} do arquivo não corresponde ao tipo de dados no template ({expected_dtype}) do template'}, 400
                            df[col_name] = df[col_name].astype(mapped_dtype)
                
                if erro_encontrado != "":
                    return {'message': mensagem}, 400
                        
                for col in campos_data['data']:
                    col_nome = col['nome']
                        
                    obrigatorio = not col['nulo']
                    print(obrigatorio)
                    if col_nome in df.columns:
                        if obrigatorio == True and (df[col_nome].isnull().any() or df[col_nome].empty):
                            mensagem = f"A coluna '{col_nome}' é obrigatória, mas possui valores nulos ou em branco."
                            erro_encontrado2 = True
                            break

                if erro_encontrado2:
                    return {'message': mensagem}, 400

            except json.JSONDecodeError as e:
                print(f"Erro ao analisar campos como JSON: {e}")
            except Exception as e:
                print(f"Erro ao comparar colunas: {e}")



            if len(df.columns) != template_columns:
                return {'message': 'O número de colunas no arquivo não corresponde ao template'}, 400
            
            
            current_time = datetime.now()
            timestamp = current_time.strftime('%Y%m%d%H%M%S')
                
            if len(dir_name) > 2:    
                user_directory = os.path.join('data', dir_name.strip('"'))
            else:
                user_directory = os.path.join('data')
                
            if not os.path.exists(user_directory):
                print(user_directory)
                os.makedirs(user_directory)

            qtd_linhas = 10

            filename = file.filename  
            dir_name_striped = dir_name.strip('"')
            if len(dir_name) > 2:
                download_path = f'{dir_name_striped}/{filename}'
            else:
                download_path = f'{filename}'
    
            fileNameExists = FilesRepository.nome_arquivo_existe(download_path)
            if fileNameExists > 0:
                split = filename.split('.') 
                filename = f"{split[0]} ({fileNameExists}).{split[1]}"
                if len(dir_name) > 2:
                    download_path = f'{dir_name_striped}/{filename}'
                else:
                    download_path = f'{filename}'
                
            file_path = os.path.join(user_directory, filename)
            if file.filename.endswith('.csv'):
                df.to_csv(file_path, index=False)
            elif file.filename.endswith('.xlsx'):
                df.to_excel(file_path, index=False, engine='openpyxl')
            elif file.filename.endswith('.xls'):
                df.to_excel(file_path, index=False, engine='openpyxl')
                
            response_data = {
                'message': 'arquivo salvo com sucesso'
            }
            tamanho = os.path.getsize(file_path)
            print("tamanho: ", tamanho)
            print("numero de linhas: ",len(df))
                
            FilesRepository.save_file_details(filename, template, download_path, timestamp, len(df), user_id)

            return response_data

    @staticmethod
    def delete_file(file_path, file_id):
        DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/Bê á Bá/back-end/server/python/myapp/data'
        
        file_path = os.path.normpath(file_path)
        
        file_directory = f'{DIRETORIO}/{file_path}'
        if os.path.isfile(file_directory):
            drop_success = FilesRepository.drop_table("Uploads", file_id)

            if drop_success:
                os.remove(file_directory)
                return {'message': 'Arquivo excluído com sucesso'}, 200
            return {'message': 'Erro ao excluir arquivo'}, 500
        else:
            return {'error': 'Arquivo não encontrado', 'caminho': file_directory}, 404
        
    @staticmethod
    def delete_dir(caminho_da_pasta, id_pasta):
        DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á Bá - Final V1/Bê á Bá/back-end/server/python/myapp/data'
        
        caminho_da_pasta = os.path.normpath(caminho_da_pasta)
        
        directory = f'{DIRETORIO}/{caminho_da_pasta}'
        try:
            res = FilesRepository.drop_table("Diretorios",id_pasta)
            if not res: 
                return {'success': False, 'message': f'Erro ao remover a pasta {caminho_da_pasta}'}
            
            # shutil.rmtree(directory)
           
            return {'success': True, 'message': f'A pasta {caminho_da_pasta} e seu conteúdo foram removidos com sucesso.'}
        
        except OSError as e:
            return {'success': False, 'message': f'Erro ao remover a pasta {caminho_da_pasta}: {e.strerror}'}

        
    @staticmethod
    def get_files():
        files = FilesRepository.get_arquivos()
        return files