import pandas as pd
import random

def gerar_dados_ficticios_csv(template_file, output_file, min_registros=10, max_registros=15):
    # Ler o arquivo CSV de template
    df_template = pd.read_csv(template_file)

    # Criar uma lista de valores fictícios para as colunas "Ativos", "Passivos" e "Patrimônio Líquido"
    dados_ficticios = []
    for _ in range(random.randint(min_registros, max_registros)):
        ativos = round(random.uniform(100000, 1000000), 2)
        passivos = round(random.uniform(100000, 1000000), 2)
        patrimonio_liquido = ativos - passivos
        dados_ficticios.append([ativos, passivos, patrimonio_liquido])

    # Adicionar os valores fictícios ao DataFrame
    df_template[["Ativos", "Passivos", "Patrimônio Líquido"]] = dados_ficticios

    # Exportar os dados fictícios em um arquivo CSV
    df_template.to_csv(output_file, index=False)

# Exemplo de uso:
gerar_dados_ficticios_csv("Balanço Mensal.csv", "Balanço Mensal outubro_2023.csv")
