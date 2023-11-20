from collections import OrderedDict
from datetime import datetime, timedelta
import json
import psycopg2
from psycopg2 import sql
from app.config import create_connection
from dateutil.relativedelta import relativedelta

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
    def get_arquivos():
        connection = create_connection()
        if connection is None:
            return None

        try:
            cursor = connection.cursor()

            query = sql.SQL("""
                SELECT *
                FROM "Uploads";
            """)

            cursor.execute(query)
            arquivos = cursor.fetchall()

            if arquivos:
                return [
                    {
                        "id": row[0],
                        "nome": row[1],
                        "formato": row[2],
                        "hora_criacao": row[3]
                    }
                    for row in arquivos
                ]

        except Exception as error:
            print(f"Erro ao buscar arquivos: {error}")
            return None

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                
    @staticmethod
    def get_Uploads_last_7days():
        connection = create_connection()
        if connection is None:
            return None

        try:
            cursor = connection.cursor()

            current_date = datetime.now()

            seven_days_ago = current_date - timedelta(days=7)

            query = sql.SQL("""
                SELECT COUNT(*) as count, date(data) as day
                FROM "Uploads"
                WHERE data >= %s
                GROUP BY day
                ORDER BY day;
            """)

            cursor.execute(query, [seven_days_ago])
            template_counts = cursor.fetchall()

            if template_counts:
                return [{"date": row[1], "count": row[0]} for row in template_counts]

        except Exception as error:
            print(f"Erro ao buscar envios de Uploads nos últimos 7 dias: {error}")
            return None

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                
    @staticmethod
    def get_Uploads_last_4week():
        connection = create_connection()
        if connection is None:
            return None

        try:
            cursor = connection.cursor()

            current_date = datetime.now()

            four_weeks_ago = current_date - timedelta(weeks=4)

            query = sql.SQL("""
                SELECT COUNT(*) as count, date(data) as day
                FROM "Uploads"
                WHERE data >= %s
                GROUP BY day
                ORDER BY day;
            """)

            cursor.execute(query, [four_weeks_ago])
            template_counts = cursor.fetchall()

            if template_counts:
                return [{"date": row[1], "count": row[0]} for row in template_counts]

        except Exception as error:
            print(f"Erro ao buscar envios de Uploads nas últimas 4 semanas: {error}")
            return None

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
                
                
    @staticmethod
    def get_Uploads_last_12months():
        connection = create_connection()
        if connection is None:
            return None

        try:
            cursor = connection.cursor()

            current_date = datetime.now()

            twelve_months_ago = current_date - relativedelta(months=12)

            query = sql.SQL("""
                SELECT COUNT(*) as count, date(data) as day
                FROM "Uploads"
                WHERE data >= %s
                GROUP BY day
                ORDER BY day;
            """)

            cursor.execute(query, [twelve_months_ago])
            template_counts = cursor.fetchall()

            if template_counts:
                return [{"date": row[1], "count": row[0]} for row in template_counts]

        except Exception as error:
            print(f"Erro ao buscar envios de Uploads nos últimos 12 meses: {error}")
            return None

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    @staticmethod
    def get_arquivos():
        try:
            connection = create_connection() 
            cursor = connection.cursor()

            cursor.execute("""
                SELECT u.nome AS upload_nome, t.nome AS template_nome, us.nome AS enviado_por,
                       u.data AS upload_data, t.status AS template_status, u.path as upload_path,
                       u.id AS upload_id, us.id AS id_usuario
                FROM "Uploads" AS u
                JOIN "Templates" AS t ON u.id_template = t.id
                JOIN "Usuarios" AS us ON u.id_usuario = us.id
            """)

            arquivos = cursor.fetchall()

            resultado_transformado = []
            for arquivo in arquivos:
                resultado_transformado.append(OrderedDict([
                    ('nome', arquivo[0]),
                    ('template', arquivo[1]),
                    ('enviado_por', arquivo[2]),
                    ('data', arquivo[3].isoformat()),
                    ('status', arquivo[4]),
                    ('download', arquivo[5]),
                    ('id', arquivo[6]),
                    ('id_usuario', arquivo[7])
                ]))

            cursor.close()

            return resultado_transformado
        except Exception as error:
            return {'error': str(error)}
    
    @staticmethod
    def nome_arquivo_existe(nome_arquivo):
        print(nome_arquivo)
        conn = create_connection()
        cursor = conn.cursor()
        nome_base = nome_arquivo.split('.')[0]

        query = """SELECT COUNT(*) FROM "Uploads" WHERE path LIKE %s"""
        print(query)
        cursor.execute(query, (f'{nome_base}%',))
        count = cursor.fetchone()[0]
        print("count: ",count)
        conn.close()

        return count