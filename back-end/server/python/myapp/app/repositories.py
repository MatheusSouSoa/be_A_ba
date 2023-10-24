from datetime import datetime
import json
import psycopg2
from psycopg2 import sql
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
                
    @staticmethod
    def drop_table(table_name, record_id):
        connection = create_connection()
        if connection is None:
            return

        try:
            cursor = connection.cursor()

            query = sql.SQL("DELETE FROM {} WHERE id = %s RETURNING id;").format(
                sql.Identifier(table_name)
            )
            
            values = (record_id,)

            cursor.execute(query, values)
            
            deleted_id = cursor.fetchone()
            connection.commit()

            if deleted_id:
                print(f"Registro ID {deleted_id[0]} excluído com sucesso da tabela {table_name}")
                return True
            else:
                print(f"Nenhum registro excluído da tabela {table_name}")
                return False

        except (Exception, psycopg2.Error) as error:
            print(f"Erro ao excluir registro da tabela {table_name}: {error}")
            return False

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
    
    @staticmethod
    def select_template_with_related_fields(record_id):
        connection = create_connection()
        if connection is None:
            return None  # Retorna None se a conexão falhar

        try:
            cursor = connection.cursor()

            query = """
                SELECT T.*, C.*
                FROM "Templates" AS T
                LEFT JOIN "Campos" AS C ON T.id = C.id_template
                WHERE T.id = %s;
            """

            values = (record_id,)

            cursor.execute(query, values)

            template_data = cursor.fetchall()  # Usamos fetchall para obter todas as linhas

            if template_data:
                # Organize os dados em um dicionário
                template_info = {
                    "template_id": template_data[0][0],
                    "template_name": template_data[0][1],
                    "template_extension": template_data[0][2],
                    "fields": []
                }

                # Preencha a lista de campos
                for row in template_data:
                    field = {
                        "template_id": row[6],
                        "field_id": row[7],
                        "field_name": row[8],
                        "field_type": row[9],
                        "field_required": row[10]
                    }
                    template_info["fields"].append(field)

                print("Informações do template organizadas com sucesso.")
                return template_info

            else:
                print(f"Nenhum registro de template encontrado para o ID {record_id}")
                return None  # Retorna None se nenhum registro for encontrado

        except (Exception, psycopg2.Error) as error:
            print(f"Erro ao buscar o registro do template: {error}")
            return None  # Retorna None em caso de erro

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
