import pandas as pd
import random
from faker import Faker

# Função para gerar dados fictícios para um arquivo CSV com os campos "Regulamentos/Políticas" e "Status de Conformidade"
def gerar_dados_ficticios_csv(output_file, num_registros=10):
    # Inicializar o Faker para geração de valores fictícios
    fake = Faker()

    # Criar listas de valores fictícios para cada coluna
    regulamentos_politicas = [fake.word() for _ in range(num_registros)]
    status_conformidade = [fake.word() for _ in range(num_registros)]

    # Criar um DataFrame com os dados fictícios
    df = pd.DataFrame({
        "Regulamentos/Políticas": regulamentos_politicas,
        "Status de Conformidade": status_conformidade
    })

    # Exportar os dados fictícios em um arquivo CSV
    df.to_csv(output_file, index=False)

# Exemplo de uso:
gerar_dados_ficticios_csv("gerados/compliance_2_trimestre.csv")
