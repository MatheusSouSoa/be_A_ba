import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import { useRouter } from "next/router";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import { useState } from "react";

const camposTemplate = ["Nome", "Formato", "Campos",  "Criado por", "Ativo"]
const templateLista: Template[] = [
  { nome: "Quero-Quero", formato: "xlsx",  campos: 6, criado_por: "Matheus", status: true, isNew: false },
  { nome: "VerdeCard", formato: "csv",  campos: 3, criado_por: "Allan", status: true, isNew: false },
  { nome: "QQTech5", formato: "xlsx",  campos: 3, criado_por: "Allan", status: true, isNew: false },
  { nome: "Loja A", formato: "csv", campos: 6, criado_por: "Matheus", status: true, isNew: true },
  { nome: "Loja B", formato: "xlsx", campos: 4, criado_por: "Ana", status: true, isNew: true },
  { nome: "TechZone", formato: "csv", campos: 5, criado_por: "Lucas", status: false, isNew: false },
  { nome: "DataMaster", formato: "xlsx", campos: 2, criado_por: "Sophia", status: true, isNew: false },
  { nome: "GreenTech", formato: "csv", campos: 7, criado_por: "Pedro", status: false, isNew: true },
  { nome: "PlanMaster", formato: "xlsx", campos: 3, criado_por: "Mariana", status: true, isNew: false },
  { nome: "EcoSolution", formato: "csv", campos: 6, criado_por: "Carlos", status: false, isNew: true },
  { nome: "FutureData", formato: "xlsx", campos: 4, criado_por: "Larissa", status: true, isNew: false },
  { nome: "DigitalWave", formato: "csv", campos: 5, criado_por: "Rafael", status: false, isNew: true },
  { nome: "TechWorld", formato: "xls", campos: 3, criado_por: "Diana", status: true, isNew: false },
  { nome: "InnoSoft", formato: "csv", campos: 4, criado_por: "Luciana", status: false, isNew: true },
  { nome: "CodeMaster", formato: "xlsx", campos: 2, criado_por: "Eduardo", status: true, isNew: false },
  { nome: "SmartData", formato: "csv", campos: 6, criado_por: "Isabella", status: true, isNew: true },
  { nome: "TechXpress", formato: "xlsx", campos: 5, criado_por: "Felipe", status: false, isNew: true },
  { nome: "DataGenius", formato: "csv", campos: 4, criado_por: "Camila", status: true, isNew: true },
  { nome: "InnovaTech", formato: "xls", campos: 3, criado_por: "Gustavo", status: true, isNew: true },
  { nome: "InfoTech", formato: "csv", campos: 7, criado_por: "Viviane", status: false, isNew: true },
];
interface Template {
  nome: string;
  formato: string;
  campos: number;
  criado_por: string;
  status: boolean;
  isNew: boolean;
  pendentes?: string
}

export default function AdminTemplates() {
  const [templateReq, setTemplateReq] = useState(templateLista)
  const [search, setSearch] = useState("")
  const [campoSelecionado, setCampoSelecionado] = useState<keyof Template>("nome"); // Inicialize com o campo desejado


  function handleSearch (value: string) {
    setSearch(value)
  }

  const handleCampos = (value: keyof Template | string) => {
    // Se o valor for uma string, use-o como o novo campo selecionado
    if(value == "Nome"){
      setCampoSelecionado("nome")
    }
    if(value == "Formato"){
      setCampoSelecionado("formato")
    }
    if(value == "Campos"){
      setCampoSelecionado("campos")
    }
    if(value == "Ativo"){
      setCampoSelecionado("pendentes")
      console.log("Pendentes rapaz")
    }
    if(value == "Criado por"){
      setCampoSelecionado("criado_por")
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
        <title>GreenLight | Templates</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          <DefaultLayout 
            handleCampo={handleCampos}
            handleSearch={handleSearch} 
            listaCampos={camposTemplate} 
            listaObj={sorted} 
            titulo="Templates"
          />
        </div>
      </div>
    </>
  )
}