import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import { useRouter } from "next/router";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import { useState } from "react";

const camposTemplate = ["Nome", "Formato", "Campos",  "Criado por", "Ativo"]
const templateLista: Template[] = [
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja B", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Quero-quero", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "VerdeCard", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
]

interface Template {
  nome: string;
  formato: string;
  campos: number;
  criado_por: string;
  status: boolean;
}


export default function AdminTemplates() {
  const [templateReq, setTemplateReq] = useState(templateLista)
  const [search, setSearch] = useState("")
  const [campos, setCampo] = useState<keyof Template>("nome") 

  function handleSearch (value: string) {
    setSearch(value)
  }

  function handleCampos (value: string) {
    setCampo(value)
  }

  const filtered = search ? templateReq.filter((item) => {
    return item.nome.toLowerCase().includes(search.toLowerCase())
  }) : templateReq

  console.log(filtered)
  console.log(search)

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
            listaObj={filtered.sort((a, b) => a["nome"].localeCompare(b["nome"]) )} 
            titulo="Templates disponível:"
          />
        </div>
      </div>
    </>
  )
}