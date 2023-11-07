import pandas as pd
import random
from faker import Faker

# Função para gerar dados fictícios para um Relatório de Despesas
def gerar_dados_ficticios_despesas(output_file, num_registros=10):
    # Inicializar o Faker para geração de categorias de despesa
    fake = Faker()

    # Criar listas de valores fictícios para cada coluna
    categorias_despesa = [fake.word() for _ in range(num_registros)]
    valores_despesa = [round(random.uniform(100.0, 1000.0), 2) for _ in range(num_registros)]

    # Criar um DataFrame com os dados fictícios
    df = pd.DataFrame({
        "Categoria de Despesa": categorias_despesa,
        "Valor da Despesa": valores_despesa
    })

    # Exportar os dados fictícios em um arquivo XLSX
    df.to_excel(output_file, index=False, engine='openpyxl')

# Exemplo de uso:
gerar_dados_ficticios_despesas("gerados/Relatorio_Despesas_-2023.xlsx")
