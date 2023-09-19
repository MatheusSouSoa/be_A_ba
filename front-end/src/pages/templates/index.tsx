import Content from "@/components/content/content";
import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import Head from "next/head";

const camposTemplate = ["Nome", "Formato", "Campos", "Criado por", "Status"]
const templateLista = [
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "xlsx",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "xls",  campos: 6, criado_por: "Matheus", status:false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "xlsx",  campos: 6, criado_por: "Matheus", status:false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "xlsx",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "xls",  campos: 6, criado_por: "Matheus", status:false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "xlsx",  campos: 6, criado_por: "Matheus", status:false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "xlsx",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "xls",  campos: 6, criado_por: "Matheus", status:false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "xlsx",  campos: 6, criado_por: "Matheus", status:false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "xlsx",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "xls",  campos: 6, criado_por: "Matheus", status:false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
    {nome: "Loja A", formato: "xlsx",  campos: 6, criado_por: "Matheus", status:false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status:true},
]

export default function Templates() {
  return (
    <>
      <Head>
          <title>GreenLight | Templates</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          <DefaultLayout listaCampos={camposTemplate} listaObj={templateLista} titulo="Templates"/>
        </div>
      </div>
    </>
  )
}