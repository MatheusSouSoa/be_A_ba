import pandas as pd
import random
from faker import Faker

# Função para gerar dados fictícios para um arquivo CSV com os campos "Cliente" e "Pontuações de Satisfação"
def gerar_dados_ficticios_csv(output_file, num_registros=10):
    # Inicializar o Faker para geração de valores fictícios
    fake = Faker()

    # Criar listas de valores fictícios para cada coluna
    clientes = [fake.name() for _ in range(num_registros)]
    pontuacoes = [random.randint(1, 10) for _ in range(num_registros)]

    # Criar um DataFrame com os dados fictícios
    df = pd.DataFrame({
        "Cliente": clientes,
        "Pontuações de Satisfação": pontuacoes
    })

    # Exportar os dados fictícios em um arquivo CSV
    df.to_csv(output_file, index=False)

# Exemplo de uso:
for i in range(12):
    gerar_dados_ficticios_csv(f"gerados/Satisfação Clientes 0{i+1}-2023.csv")
    