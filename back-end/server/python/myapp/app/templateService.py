from app.TemplateRepository import TemplateRepository
import json
import pandas as pd
import os
from datetime import datetime
from flask import request, jsonify
import shutil

import pandas as pd
import os

import os
import pandas as pd

class TemplateService:
    @staticmethod
    def upload_template(user_id, template_id):
        DIRETORIO = 'C:/Users/980189/Documents/Matheus/QueroQuero/QQTech tarefas/Bê á bá/back-end/server/python/myapp/data/users'
        user_directory = os.path.join(DIRETORIO, str(user_id), 'downloadTemplates', str(template_id))
        file_path = os.path.join(user_directory)
        
        template_data = TemplateRepository.select_template_with_related_fields(template_id)
        
        if template_data:
            print(template_data)
            template_info = {
                "fields": [],
                "template_extension": template_data["template_extension"],
                "template_name": template_data["template_name"]
            }

            for field_data in template_data["fields"]:
                field_name = field_data["field_name"]
                field_type = field_data["field_type"]

                tipo_dado_mapping = {
                    'texto': 'object',
                    'inteiro': 'int64',
                    'decimal': 'float64',
                    'booleano': 'bool',
                    'data': 'datetime64'
                }

                template_info["fields"].append({
                    "field_name": field_name,
                    "field_type": tipo_dado_mapping.get(field_type, 'string')
                })

            df = pd.DataFrame(columns=[field["field_name"] for field in template_info["fields"]])

            if template_info["template_extension"] == "xlsx":
                df.to_excel(os.path.join(file_path, f"{template_info['template_name']}.xlsx"), index=False)
            elif template_info["template_extension"] == "csv":
                df.to_csv(os.path.join(file_path, f"{template_info['template_name']}.csv"), index=False)
            
            print("Template criado com sucesso.")
            
            return f"{template_info['template_name']}.{template_info['template_extension']}"

@staticmethod
def create_directory_if_not_exists(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)
        

        


        