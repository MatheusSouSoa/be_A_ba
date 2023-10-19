from datetime import datetime
import json
import psycopg2
from app.config import create_connection

class FilesRepository:
    @staticmethod
    def save_file_details(filename, template, file_path, hora_criacao, qtd_linhas, user_id):
        connection = create_connection()
        if connection is None:
            return

        try:
            cursor = connection.cursor()
            
            data_hora_obj = datetime.strptime(hora_criacao, '%Y%m%d%H%M%S')

            query = """
                INSERT INTO "Uploads" (nome, data, qtd_linhas, path, id_template, id_usuario)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id;
            """ 
            template_data = json.loads(template)
            template_id = template_data["id"]
            
            values = (filename, data_hora_obj, qtd_linhas, file_path, template_id, user_id)
            
            cursor.execute(query, values)

            upload_id = cursor.fetchone()[0]
            connection.commit()

            print(f"Arquivo salvo no banco com ID: {upload_id}")

        except (Exception, psycopg2.Error) as error:
            print(f"Erro ao inserir os detalhes do arquivo no banco de dados: {error}")

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                

