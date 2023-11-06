import pandas as pd
import random
import faker

# Função para gerar dados fictícios
def gerar_dados_ficticios_folha(template_file, output_file, num_registros=10):
    # Ler o arquivo CSV de template
    df_template = pd.read_csv(template_file)

    # Inicializar o Faker para geração de nomes
    fake = faker.Faker()

    # Criar listas de valores fictícios para cada coluna
    nomes = [fake.name() for _ in range(num_registros)]
    identificacao = [f"980{str(random.randint(100, 999))}" for _ in range(num_registros)]
    salario_base = [round(random.uniform(3000, 8000), 2) for _ in range(num_registros)]
    horas_trabalhadas = [round(random.uniform(160, 240), 2) for _ in range(num_registros)]
    deducoes_impostos = [round(random.uniform(200, 600), 2) for _ in range(num_registros)]
    beneficios = [round(random.uniform(100, 500), 2) for _ in range(num_registros)]
    salario_liquido = [round(salario_base[i] * (1 - deducoes_impostos[i] / 100) + beneficios[i], 2) for i in range(num_registros)]

    # Preencher o DataFrame com os dados fictícios
    df_template["Nome do Funcionário"] = nomes
    df_template["Identificação do Funcionário"] = identificacao
    df_template["Salário Base"] = salario_base
    df_template["Horas Trabalhadas"] = horas_trabalhadas
    df_template["Deduções de Impostos"] = deducoes_impostos
    df_template["Benefícios"] = beneficios
    df_template["Salário Líquido"] = salario_liquido

    # Exportar os dados fictícios em um arquivo CSV
    df_template.to_csv(output_file, index=False)

# Exemplo de uso:
gerar_dados_ficticios_folha("Folha de Pagamento.csv", "Folha de pagamento julho_2023.csv")
