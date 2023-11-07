import pandas as pd
from faker import Faker
import random
from datetime import datetime, timedelta

def gerar_arquivo_dinamico(nome_arquivo, colunas, i):
    df = pd.DataFrame(columns=colunas.keys())

    fake = Faker() 

    for coluna, tipo_dado in colunas.items():
        if tipo_dado == 'nome':
            dados = [fake.name() for _ in range(10)]
        elif tipo_dado == 'texto':
            dados = [fake.sentence() for _ in range(10)]
        elif tipo_dado == 'inteiro':
            dados = [random.randint(18, 65) for _ in range(10)]
        elif tipo_dado == 'decimal':
            dados = [round(random.uniform(100.0, 1000.0), 2) for _ in range(10)]
        elif tipo_dado == 'data':
            hoje = datetime.now()
            datas = [hoje - timedelta(days=random.randint(0, 365)) for _ in range(10)]
            dados = [data.strftime('%Y-%m-%d') for data in datas]
        elif tipo_dado == 'booleano':
            dados = [random.choice([True, False]) for _ in range(10)]
        else:
            dados = [input(f'Informe os dados para a coluna "{coluna}" ({tipo_dado}): ')]
        df[coluna] = dados

    if i is not None:
        nome_arquivo = nome_arquivo.format(i=i + 1)
        
    if nome_arquivo.lower().endswith('.csv'):
        df.to_csv(f"gerados/{nome_arquivo}", index=False)
    elif nome_arquivo.lower().endswith(('.xls', '.xlsx')):
        df.to_excel(f"gerados/{nome_arquivo}", index=False, engine='openpyxl')
    else:
        print('Formato de arquivo não suportado. Use .csv, .xls ou .xlsx')
        return

    print(f'Arquivo "{nome_arquivo}" gerado com sucesso.')

# colunas = {
#     'Nome': 'nome',
#     'Endereço': 'texto',
#     'Idade': 'inteiro',
#     'Salário': 'decimal',
#     'Data de Contratação': 'data',
#     'Ativo': 'booleano'
# }
#Defina aqui as colunas do seu arquivo com os seus tipos para a geração
colunas = {
    'Data': 'data',
}

	

nome_arquivo = input('Nome do arquivo de saída (por exemplo, "arquivo.csv" ou "arquivo.xlsx"): ')
qtd = int(input('Qtd de arquivos: '))
if qtd > 1:
    for i in range(qtd):
        gerar_arquivo_dinamico(f"{nome_arquivo}", colunas, i)
else:
    gerar_arquivo_dinamico(nome_arquivo, colunas, i = 1)
