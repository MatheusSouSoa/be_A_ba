import pandas as pd
import random
from faker import Faker

# Função para gerar dados fictícios para um Relatório de Orçamento Anual
def gerar_dados_ficticios_orcamento(output_file, num_registros=10):
    # Inicializar o Faker para geração de categorias de despesa/receita
    fake = Faker()

    # Criar listas de valores fictícios para cada coluna
    categorias_despesa_receita = [fake.word() for _ in range(num_registros)]
    orcamento_realizado = [round(random.uniform(1000.0, 10000.0), 2) for _ in range(num_registros)]
    orcamento_planejado = [round(random.uniform(1000.0, 10000.0), 2) for _ in range(num_registros)]

    # Criar um DataFrame com os dados fictícios
    df = pd.DataFrame({
        "Categoria de Despesa/Receita": categorias_despesa_receita,
        "Orçamento Realizado": orcamento_realizado,
        "Orçamento Planejado": orcamento_planejado
    })

    # Exportar os dados fictícios em um arquivo XLSX
    df.to_excel(output_file, index=False, engine='openpyxl')

# Exemplo de uso:
gerar_dados_ficticios_orcamento("gerados/Orcamento_2023.xlsx")
