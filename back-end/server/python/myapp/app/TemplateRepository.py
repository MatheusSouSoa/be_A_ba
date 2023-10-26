from datetime import datetime
import json
import psycopg2
from psycopg2 import sql
from app.config import create_connection

class TemplateRepository:
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
    def get_templates():
        connection = create_connection()
        if connection is None:
            return None

        try:
            cursor = connection.cursor()

            query = sql.SQL("""
                SELECT *
                FROM "Templates";
            """)

            cursor.execute(query)
            templates = cursor.fetchall()

            if templates:
                return [
                    {
                        "id": row[0],
                        "nome": row[1],
                        "formato": row[2],
                        "ativo": row[3]
                    }
                    for row in templates
                ]

        except Exception as error:
            print(f"Erro ao buscar templates: {error}")
            return None

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
    
    
    @staticmethod
    def get_templates_last_7days():
        connection = create_connection()
        if connection is None:
            return None

        try:
            cursor = connection.cursor()

            query = sql.SQL("""
                SELECT COUNT(*) FROM "Templates"
                WHERE data >= NOW() - INTERVAL '7 DAY';
            """)

            cursor.execute(query)
            templates = cursor.fetchall()

            if templates:
                return [dict(zip([desc[0] for desc in cursor.description], row)) for row in templates]

        except Exception as error:
            print(f"Erro ao buscar templates: {error}")
            return None

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                
    @staticmethod
    def get_templates_last_4week():
        connection = create_connection()
        if connection is None:
            return None

        try:
            cursor = connection.cursor()

            query = sql.SQL("""
                SELECT COUNT(*) FROM "Templates"
                WHERE data >= NOW() - INTERVAL '4 WEEK';
            """)

            cursor.execute(query)
            templates = cursor.fetchall()

            if templates:
                return [dict(zip([desc[0] for desc in cursor.description], row)) for row in templates]

        except Exception as error:
            print(f"Erro ao buscar templates: {error}")
            return None

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
    @staticmethod
    def get_templates_last_12month():
        connection = create_connection()
        if connection is None:
            return None

        try:
            cursor = connection.cursor()

            query = sql.SQL("""
                SELECT COUNT(*) FROM "Templates"
                WHERE data >= NOW() - INTERVAL '12 MONTH';
            """)

            cursor.execute(query)
            templates = cursor.fetchall()

            if templates:
                return [dict(zip([desc[0] for desc in cursor.description], row)) for row in templates]

        except Exception as error:
            print(f"Erro ao buscar templates: {error}")
            return None

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                

