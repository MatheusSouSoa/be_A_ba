# from datetime import datetime, timedelta
# import pandas as pd
# from app.TemplateRepository import TemplateRepository
# from app.repositories import FilesRepository

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

        for item in files12Months:
            data = item["date"]
            mes_ano = data.strftime("%B")

            if mes_ano not in dados_por_mes:
                dados_por_mes[mes_ano] = []

            dados_por_mes[mes_ano].append(item)
        
        meses_numeros = {
            "January": 1, "February": 2, "March": 3, "April": 4,
            "May": 5, "June": 6, "July": 7, "August": 8,
            "September": 9, "October": 10, "November": 11, "December": 12
        }
        
        dados_por_mes_numeros = {meses_numeros[mes]: dados_por_mes.get(mes, [{"count": 0, "date": None}]) for mes in meses_numeros}

        dados_por_semana = {}

        for item in files4Weeks:
            data = item["date"]
            ano_semana = data.strftime("%U")

            if ano_semana not in dados_por_semana:
                dados_por_semana[ano_semana] = []

            dados_por_semana[ano_semana].append(item)

        hoje = datetime.now()
        numero_semana_atual = hoje.strftime("%U")

        for i in range(4):
            semana = str(int(numero_semana_atual) - i)
            if semana not in dados_por_semana:
                dados_por_semana[semana] = [{"count": 0, "date": None}]

        meses = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        total_por_mes = [0] * 12

        for mes, dados in dados_por_mes.items():
            total = sum(dado["count"] for dado in dados)  
            indice = meses.index(mes) 
            total_por_mes[indice] = total  


        dados_ultimas_4_semanas = {}

        for item in files4Weeks:
            data = item["date"]
            ano_semana = data.strftime("%U")

            if ano_semana not in dados_ultimas_4_semanas:
                dados_ultimas_4_semanas[ano_semana] = []

            dados_ultimas_4_semanas[ano_semana].append(item)

        hoje = datetime.now()
        numero_semana_atual = int(hoje.strftime("%U"))

        total_por_semana = [0] * 4

        for i in range(3, -1, -1):  
            semana = numero_semana_atual - i 
            semana_str = str(semana)

            if semana_str in dados_ultimas_4_semanas:
                total = sum(dado["count"] for dado in dados_ultimas_4_semanas[semana_str])
                total_por_semana[i] = total

        temp7DaysTemplates = TemplateRepository.get_templates_last_7days()

        dados_por_mes_templates = {}

        for item in temp7DaysTemplates:
            data = item["date"]
            mes_ano = data.strftime("%B")

            if mes_ano not in dados_por_mes_templates:
                dados_por_mes_templates[mes_ano] = []

            dados_por_mes_templates[mes_ano].append(item)

        total_por_mes_templates = [0] * 12

        for mes, dados in dados_por_mes_templates.items():
            total = sum(dado["count"] for dado in dados)
            indice = meses.index(mes)
            total_por_mes_templates[indice] = total

        temp4WeeksTemplates = TemplateRepository.get_templates_last_4week()

        dados_por_semana_templates = {}

        for item in temp4WeeksTemplates:
            data = item["date"]
            ano_semana = data.strftime("%U")

            if ano_semana not in dados_por_semana_templates:
                dados_por_semana_templates[ano_semana] = []

            dados_por_semana_templates[ano_semana].append(item)

        hoje = datetime.now()
        numero_semana_atual = hoje.strftime("%U")

        total_por_semana_templates = [0] * 4
        for i in range(4):
            semana = str(int(numero_semana_atual) - i)
            if semana not in dados_por_semana_templates:
                dados_por_semana_templates[semana] = [{"count": 0, "date": None}]
            total_por_semana_templates[i] = sum(dado["count"] for dado in dados_por_semana_templates[semana])

        temp12MonthsTemplates = TemplateRepository.get_templates_last_12months()

        dados_por_mes_12months_templates = {}

        for item in temp12MonthsTemplates:
            data = item["date"]
            mes_ano = data.strftime("%B")

            if mes_ano not in dados_por_mes_12months_templates:
                dados_por_mes_12months_templates[mes_ano] = []

            dados_por_mes_12months_templates[mes_ano].append(item)

        total_por_mes_12months_templates = [0] * 12

        for mes, dados in dados_por_mes_12months_templates.items():
            total = sum(dado["count"] for dado in dados)
            indice = meses.index(mes)
            total_por_mes_12months_templates[indice] = total

        temp7DaysTemplates = TemplateRepository.get_templates_last_7days()

        print(temp7DaysTemplates)
        
        hoje = datetime.now().date()

        total_temp_7_dias = [0] * 7

        for i in range(7):
            data_limite = hoje - timedelta(days=i)
            total_dia = sum(template["count"] for template in temp7DaysTemplates if template["date"] == data_limite)
            total_temp_7_dias[i] = total_dia
            
        files7Days = FilesRepository.get_Uploads_last_7days()

        print(files7Days)
        
        hoje = datetime.now().date()

        total_files_7_dias = [0] * 7

        for i in range(7):
            data_limite = hoje - timedelta(days=i)
            total_dia = sum(upload["count"] for upload in files7Days if upload["date"] == data_limite)
            total_files_7_dias[i] = total_dia
            
        return {
            "quantidade_total_arquivos": quantidade_total_arquivos,
            "quantidade_arquivos_por_formato": quantidade_arquivos_por_formato,
            "quantidade_templates_ativos": quantidade_templates_ativos,
            "quantidade_templates_inativos": quantidade_templates_inativos,
            "quantidade_templates_por_formato": quantidade_templates_por_formato,
            "quantidade_arquivos_7_dias": files7Days,
            "total_por_mes": total_por_mes,
            "total_por_semana": total_por_semana,
            "total_temp_7_dias": total_temp_7_dias,
            "total_temp_4_semanas": total_por_semana_templates,
            "total_temp_12_meses": total_por_mes_12months_templates,
            "total_files_7_dias" : total_files_7_dias
        }
