import PaginaArquivos from "@/components/content/Files/PaginaArquivos";
import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import Head from "next/head";

const camposArquivo = ["Nome", "Template", "Linhas", "Data", "Criado por"]


export default function Arquivos() {
  return (
    <>
      <Head>
          <title>GreenLight | Arquivos</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex  bg-zinc-300 h-full w-full main-content">
          <Side/>
          <PaginaArquivos/>
        </div>
      </div>
    </>
  )
}