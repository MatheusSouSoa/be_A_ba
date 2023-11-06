import pandas as pd
import random
from faker import Faker

# Função para gerar dados fictícios para um Relatório de Qualidade do Produto
def gerar_dados_ficticios_qualidade(output_file, num_registros=10):
    # Inicializar o Faker para geração de produtos/serviços
    fake = Faker()

    # Criar listas de valores fictícios para cada coluna
    produtos_servicos = [fake.word() for _ in range(num_registros)]
    resultados_testes_qualidade = [fake.text() for _ in range(num_registros)]

    # Criar um DataFrame com os dados fictícios
    df = pd.DataFrame({
        "Produto/Serviço": produtos_servicos,
        "Resultados de Testes de Qualidade": resultados_testes_qualidade
    })

    # Exportar os dados fictícios em um arquivo XLSX
    df.to_excel(output_file, index=False, engine='openpyxl')

# Exemplo de uso:
gerar_dados_ficticios_qualidade("Qualidade_Produto_Troca_de_Frota.xlsx")
