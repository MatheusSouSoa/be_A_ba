import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import { UseAuth } from "@/hooks/useAuth";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

const camposArquivo = ["Nome", "Template", "Enviado por", "Data", "Download"]
const arquivoLista1 = [
  { nome: "Supermercado MegaMart", template: "Folha Salarial 2023", enviado_por: "Matheus", data: "2023-05-05", status: true },
  { nome: "Loja de Roupas Fashionista", template: "Controle de Entradas", linhas: 45, data: "2023-06-15", status: true },
  { nome: "Restaurante Sabor do Sertão", template: "Relatório de Vendas", linhas: 89, data: "2023-07-20", status: false },
  { nome: "Loja de Eletrônicos TecnoShop", template: "Folha de Pagamento", linhas: 53, data: "2023-08-10", status: true },
  { nome: "Salão de Beleza BellaVida", template: "Estoque de Produtos", linhas: 76, data: "2023-09-02", status: true },
  { nome: "Oficina Mecânica AutoFix", template: "Ordens de Serviço", linhas: 32, data: "2023-10-15", status: true },
  { nome: "Cafeteria Aroma Delícia", template: "Relatório de Gastos", linhas: 45, data: "2023-11-22", status: false },
  { nome: "Academia Fitness Pro", template: "Agendamento de Aulas", linhas: 68, data: "2023-12-05", status: true },
  { nome: "Farmácia Saúde Total", template: "Contas a Pagar", linhas: 55, data: "2024-01-10", status: true },
  { nome: "Livros & Cia", template: "Relatório de Estoque", linhas: 77, data: "2024-02-18", status: true },
  { nome: "Cinema CineMax", template: "Programação Semanal", linhas: 40, data: "2024-03-25", status: true },
  { nome: "Pet Shop Fofinhos", template: "Registro de Clientes", linhas: 62, data: "2024-04-12", status: false },
  { nome: "Loja de Brinquedos Alegria", template: "Inventário de Produtos", linhas: 88, data: "2024-05-30", status: true },
  { nome: "Pizzaria Bella Napoli", template: "Pedidos Online", linhas: 70, data: "2024-06-08", status: true },
  { nome: "Consultório Odontológico Sorriso", template: "Agendamento de Consultas", linhas: 36, data: "2024-07-19", status: false },
  { nome: "Floricultura Flores do Jardim", template: "Registro de Vendas", linhas: 49, data: "2024-08-14", status: true },
  { nome: "Escola Educação Avançada", template: "Notas dos Alunos", linhas: 58, data: "2024-09-29", status: true },
  { nome: "Clube de Tênis Ace", template: "Agendamento de Quadras", linhas: 44, data: "2024-10-07", status: true },
  { nome: "Hospital São Lucas", template: "Prontuários Médicos", linhas: 91, data: "2024-11-12", status: false },
  { nome: "Loja de Informática TechWorld", template: "Relatório de Vendas", linhas: 52, data: "2024-12-23", status: true }
];


interface Arquivos {
  nome: string;
  template: string;
  enviado_por: string;
  data: Date;
  status: boolean;
}

export default function MeusArquivos() {
  const [arquivoLista, setArquivoLista] = useState(arquivoLista1)
  const [loading, setLoading] = useState(true); 
  const {config} = UseAuth()

  useEffect(() => {
    async function fetchTemplates() {
      const ip = process.env.NEXT_PUBLIC_IP || "localhost";

      try {
        const response = await axios.get(`http://${ip}:8080/api/arquivo`, config);
        if (response.status === 200) {
          console.log(response.data)
          setTemplateReq(response.data.filter((template: { status: boolean; }) => template.status === true));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, []);

  const [templateReq, setTemplateReq] = useState(arquivoLista)
  const [search, setSearch] = useState("")
  const [campoSelecionado, setCampoSelecionado] = useState<keyof Arquivos>("nome");

  function handleSearch (value: string) {
    setSearch(value)
    console.log(search)
  }

  const handleCampos = (value: keyof Arquivos | string) => {
    // Se o valor for uma string, use-o como o novo campo selecionado
    if(value == "Nome"){
      setCampoSelecionado("nome")
    }
    if(value == "Data"){
      setCampoSelecionado("data")
    }
    if(value == "Template"){
      setCampoSelecionado("template")
    }
    if(value == "Enviado por"){
      setCampoSelecionado("enviado_por")
      console.log("Pendentes rapaz: ",value)
    }
  };

  const filtered = search ? templateReq.filter((item) => {
    return String(item[campoSelecionado]).toLowerCase().includes(search.toLowerCase());
  }) : templateReq
  
  const sorted = filtered.sort((a, b) => {
    const fieldA = String(a[campoSelecionado]).toLowerCase();
    const fieldB = String(b[campoSelecionado]).toLowerCase();

    return fieldA.localeCompare(fieldB);
  });

  return (
    <>
      <Head>
        <title>GreenLight | Arquivos</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          <DefaultLayout  
            handleCampo={handleCampos}
            handleSearch={handleSearch}
            listaCampos={camposArquivo} 
            listaObj={sorted} 
            titulo="Meus Arquivos"
          />
        </div>
      </div>
    </>
  )
}