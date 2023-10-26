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
        temp12Months = TemplateRepository.get_templates_last_12month()
        
        files7Days = FilesRepository.get_files_last_7days()
        files4Weeks = FilesRepository.get_files_last_4week()
        files12Months = FilesRepository.get_files_last_12month()

        return {
            "quantidade_total_arquivos": quantidade_total_arquivos,
            "quantidade_arquivos_por_formato": quantidade_arquivos_por_formato,
            "quantidade_total_templates": quantidade_total_templates,
            "quantidade_templates_ativos": quantidade_templates_ativos,
            "quantidade_templates_inativos": quantidade_templates_inativos,
            "quantidade_templates_por_formato": quantidade_templates_por_formato,
            "quantidade_templates_7_dias": temp7Days,
            "quantidade_templates_4_semanas": temp4Weeks,
            "quantidade_templates_12_meses": temp12Months,
            "quantidade_arquivos_7_dias": files7Days,
            "quantidade_arquivos_4_semanas": files4Weeks,
            "quantidade_arquivos_12_meses": files12Months,
            
        }
        