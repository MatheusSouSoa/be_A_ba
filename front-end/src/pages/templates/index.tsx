import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import { UseAuth } from "@/hooks/useAuth";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

const camposTemplate = ["Nome", "Formato", "Campos", "Criado por", "Data Criação"]
const templateLista: Template[] = [];

interface Template {
  nome: string;
  formato: string;
  campos: number;
  criado_por: string;
  status: boolean;
  isNew: boolean;
  pendentes?: string;
  data: Date
}

export default function Templates() {

  const [templateReq, setTemplateReq] = useState(templateLista)
  const [search, setSearch] = useState("")
  const [campoSelecionado, setCampoSelecionado] = useState<keyof Template>("nome");
  const [loading, setLoading] = useState(true); 
  const { config } = UseAuth()
  
  useEffect(() => {
    async function fetchTemplates() {
      const ip = process.env.NEXT_PUBLIC_IP || "localhost";

      try {
        const response = await axios.get(`http://${ip}:8080/api/template/getAll`, config);
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


  function handleSearch(value: string) {
    setSearch(value);
  }

  const handleCampos = (value: keyof Template | string) => {
    if(value == "Nome"){
      setCampoSelecionado("nome")
    }
    if(value == "Formato"){
      setCampoSelecionado("formato")
    }
    if(value == "Campos"){
      setCampoSelecionado("campos")
    }
    if(value == "Data Criação"){
      setCampoSelecionado("data")
      console.log("Pendentes rapaz: ",value)
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
            titulo="Templates"/>
        </div>
      </div>
    </>
  )
}