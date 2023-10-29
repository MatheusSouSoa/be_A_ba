from datetime import datetime, timedelta
import pandas as pd
from app.TemplateRepository import TemplateRepository
from app.repositories import FilesRepository

class DashboardService:
    @staticmethod
    def genDashboardData():
        templates = TemplateRepository.get_templates()
        arquivos = FilesRepository.get_arquivos()

        data = {
            "templates": templates,
            "arquivos": arquivos
        }

        arquivos_df = pd.DataFrame(data['arquivos'])
        templates_df = pd.DataFrame(data['templates'])

        quantidade_total_arquivos = len(arquivos_df)
        arquivos_df['formato'] = arquivos_df['nome'].str.split('.').str[-1]  
        quantidade_arquivos_por_formato = arquivos_df['formato'].value_counts().to_dict()

        quantidade_total_templates = len(templates_df)
        quantidade_templates_ativos = len(templates_df[templates_df['ativo']])
        quantidade_templates_inativos = len(templates_df[~templates_df['ativo']])
        quantidade_templates_por_formato = templates_df['formato'].value_counts().to_dict()
        
        temp7Days = TemplateRepository.get_templates_last_7days()
        temp4Weeks = TemplateRepository.get_templates_last_4week()
        temp12Months = TemplateRepository.get_templates_last_12months()
        
        files7Days = FilesRepository.get_Uploads_last_7days()
        files4Weeks = FilesRepository.get_Uploads_last_4week()
        files12Months = FilesRepository.get_Uploads_last_12months()
        
        dados_por_mes = {}

        for item in files4Weeks:
            data = item["date"]
            mes_ano = data.strftime("%B")

            if mes_ano not in dados_por_mes:
                dados_por_mes[mes_ano] = []

            dados_por_mes[mes_ano].append(item)
        
        # Mapeamento de nomes de meses para números de mês
        meses_numeros = {
            "January": 1, "February": 2, "March": 3, "April": 4,
            "May": 5, "June": 6, "July": 7, "August": 8,
            "September": 9, "October": 10, "November": 11, "December": 12
        }
        
        # Crie a saída com números de mês
        dados_por_mes_numeros = {meses_numeros[mes]: dados_por_mes.get(mes, [{"count": 0, "date": None}]) for mes in meses_numeros}

        dados_por_semana = {}

        for item in files4Weeks:
            data = item["date"]
            ano_semana = data.strftime("%U")

            if ano_semana not in dados_por_semana:
                dados_por_semana[ano_semana] = []

            dados_por_semana[ano_semana].append(item)

        # Obter o número da semana atual
        hoje = datetime.now()
        numero_semana_atual = hoje.strftime("%U")

        # Verificar as últimas 4 semanas, adicionando contagens zero se não houver dados
        for i in range(4):
            semana = str(int(numero_semana_atual) - i)
            if semana not in dados_por_semana:
                dados_por_semana[semana] = [{"count": 0, "date": None}]

        meses = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        # Inicializar um array de totais por mês com 12 posições, todas como 0
        total_por_mes = [0] * 12

        # Iterar pelos meses em 'dados_por_mes' e calcular o total para cada mês
        for mes, dados in dados_por_mes.items():
            total = sum(dado["count"] for dado in dados)  # Somar todos os 'count' no mês
            indice = meses.index(mes)  # Encontrar o índice correspondente ao mês
            total_por_mes[indice] = total  # Armazenar o total no array
from datetime import datetime, timedelta
import pandas as pd
from app.TemplateRepository import TemplateRepository
from app.repositories import FilesRepository

class DashboardService:
    @staticmethod
    def genDashboardData():
        templates = TemplateRepository.get_templates()
        arquivos = FilesRepository.get_arquivos()

        data = {
            "templates": templates,
            "arquivos": arquivos
        }

        arquivos_df = pd.DataFrame(data['arquivos'])
        templates_df = pd.DataFrame(data['templates'])

        quantidade_total_arquivos = len(arquivos_df)
        arquivos_df['formato'] = arquivos_df['nome'].str.split('.').str[-1]  
        quantidade_arquivos_por_formato = arquivos_df['formato'].value_counts().to_dict()

        quantidade_total_templates = len(templates_df)
        quantidade_templates_ativos = len(templates_df[templates_df['ativo']])
        quantidade_templates_inativos = len(templates_df[~templates_df['ativo']])
        quantidade_templates_por_formato = templates_df['formato'].value_counts().to_dict()
        
        temp7Days = TemplateRepository.get_templates_last_7days()
        temp4Weeks = TemplateRepository.get_templates_last_4week()
        temp12Months = TemplateRepository.get_templates_last_12months()
        
        files7Days = FilesRepository.get_Uploads_last_7days()
        files4Weeks = FilesRepository.get_Uploads_last_4week()
        files12Months = FilesRepository.get_Uploads_last_12months()
        
        dados_por_mes = {}

        for item in files4Weeks:
            data = item["date"]
            mes_ano = data.strftime("%B")

            if mes_ano not in dados_por_mes:
                dados_por_mes[mes_ano] = []

            dados_por_mes[mes_ano].append(item)
        
        # Mapeamento de nomes de meses para números de mês
        meses_numeros = {
            "January": 1, "February": 2, "March": 3, "April": 4,
            "May": 5, "June": 6, "July": 7, "August": 8,
            "September": 9, "October": 10, "November": 11, "December": 12
        }
        
        # Crie a saída com números de mês
        dados_por_mes_numeros = {meses_numeros[mes]: dados_por_mes.get(mes, [{"count": 0, "date": None}]) for mes in meses_numeros}

        dados_por_semana = {}

        for item in files4Weeks:
            data = item["date"]
            ano_semana = data.strftime("%U")

            if ano_semana not in dados_por_semana:
                dados_por_semana[ano_semana] = []

            dados_por_semana[ano_semana].append(item)

        # Obter o número da semana atual
        hoje = datetime.now()
        numero_semana_atual = hoje.strftime("%U")

        # Verificar as últimas 4 semanas, adicionando contagens zero se não houver dados
        for i in range(4):
            semana = str(int(numero_semana_atual) - i)
            if semana not in dados_por_semana:
                dados_por_semana[semana] = [{"count": 0, "date": None}]

        meses = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        # Inicializar um array de totais por mês com 12 posições, todas como 0
        total_por_mes = [0] * 12

        # Iterar pelos meses em 'dados_por_mes' e calcular o total para cada mês
        for mes, dados in dados_por_mes.items():
            total = sum(dado["count"] for dado in dados)  # Somar todos os 'count' no mês
            indice = meses.index(mes)  # Encontrar o índice correspondente ao mês
            total_por_mes[indice] = total  # Armazenar o total no array

        # total_por_semana = [0] * 4

        # # Iterar pelas semanas em 'dados_ultimas_4_semanas' e calcular o total para cada semana
        # for semana, dados in dados_ultimas_4_semanas.items():
        #     total = sum(dado["count"] for dado in dados)  # Somar todos os 'count' na semana
        #     indice = int(semana.split()[-1]) - 1  # Encontrar o índice correspondente à semana (subtrai 1 porque a indexação começa em 0)
        #     total_por_semana[indice] = total  # Armazenar o total no array
        # Crie um dicionário para armazenar os dados das últimas 4 semanas
        dados_ultimas_4_semanas = {}

        for item in files4Weeks:
            data = item["date"]
            ano_semana = data.strftime("%U")

            if ano_semana not in dados_ultimas_4_semanas:
                dados_ultimas_4_semanas[ano_semana] = []

            dados_ultimas_4_semanas[ano_semana].append(item)

        # Obter o número da semana atual
        # Obter o número da semana atual
        hoje = datetime.now()
        numero_semana_atual = int(hoje.strftime("%U"))

        # Inicialize um array de totais por semana com 4 posições, todas como 0
        total_por_semana = [0] * 4

        # Iterar pelas últimas 4 semanas, em ordem decrescente
        for i in range(3, -1, -1):  # Comece da semana atual (0) e vá até 3 semanas atrás (3)
            semana = numero_semana_atual - i  # Calcule o número da semana
            semana_str = str(semana)

            if semana_str in dados_ultimas_4_semanas:
                total = sum(dado["count"] for dado in dados_ultimas_4_semanas[semana_str])
                total_por_semana[i] = total


            
        return {
            "quantidade_total_arquivos": quantidade_total_arquivos,
            "quantidade_arquivos_por_formato": quantidade_arquivos_por_formato,
            # "quantidade_total_templates": quantidade_total_templates,
            "quantidade_templates_ativos": quantidade_templates_ativos,
            "quantidade_templates_inativos": quantidade_templates_inativos,
            "quantidade_templates_por_formato": quantidade_templates_por_formato,
            # "quantidade_templates_7_dias": temp7Days,
            # "quantidade_templates_4_semanas": temp4Weeks,
            # "quantidade_templates_12_meses": temp12Months,
            "quantidade_arquivos_7_dias": files7Days,
            # "quantidade_arquivos_4_semanas": files4Weeks,
            # "quantidade_arquivos_12_meses": files12Months,
            # "dados_por_mes": dados_por_mes_numeros,
            # "dados_por_semana": dados_por_semana,
            "total_por_mes": total_por_mes,
            "total_por_semana": total_por_semana
        }
