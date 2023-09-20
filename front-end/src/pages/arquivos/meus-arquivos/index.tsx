import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import Head from "next/head";

const camposArquivo = ["Nome", "Template", "Linhas", "Data", "Download"]
const arquivoLista = [
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: true},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
    {nome: "Loja 01", template: "Loja A", linhas: 67, data: "2023-05-05", status: false},
]

export default function MeusArquivos() {
  return (
    <>
      <Head>
        <title>GreenLight | Arquivos</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          <DefaultLayout listaCampos={camposArquivo} listaObj={arquivoLista} titulo="Meus Arquivos"/>
        </div>
      </div>
    </>
  )
}