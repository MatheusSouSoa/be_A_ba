import psycopg2

# Configurações de conexão
DB_HOST = "localhost"
DB_NAME = "postgres"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_PORT=5432

def create_connection():
    try:
        connection = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port = DB_PORT
        )
        # print("Conexão estabelecida com sucesso!")
        return connection
    except (Exception, psycopg2.Error) as error:
        print(f"Erro ao conectar ao banco de dados: {error}")
        return None
