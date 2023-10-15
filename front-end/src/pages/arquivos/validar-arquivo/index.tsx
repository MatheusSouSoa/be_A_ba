import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import SelecaoTemplate from "./selecaoTemplate/SelecaoTemplate";
import CarregarArquivo from "./carregarArquivo/CarregarArquivo";
import { useState } from "react";

export default function MeusArquivos() {

  const [selectedTemplate, setSelected] = useState("Não Selecionado")

  function handleSelectedTemplate(temp: any) {
    console.log(temp)
    setSelected(temp)
  }

  return (
    <>
      <Head>
        <title>GreenLight | Validar Arquivos</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          <div className="flex text-black w-full h-full rounded-3xl items-center justify-around flex-col gap-4 px-5 py-5">
            <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 shadow-md overflow-hidden">
                <SelecaoTemplate handleSelectedTemplate={handleSelectedTemplate}/>
            </div>
            <div className="flex max-h-[50%] flex-col w-full h-full items-cente bg-white rounded-2xl gap-4 shadow-md overflow-hidden">
                <CarregarArquivo templateSelecionado={selectedTemplate}/>
            </div>
        </div>
        </div>
      </div>
    </>
  )
}