import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import { UseAuth } from "@/hooks/useAuth";
import axios from "axios";
import Head from "next/head";
import { CircleNotch } from "phosphor-react";
import { useEffect, useState } from "react";

const camposArquivo = ["Nome", "Template", "Enviado por", "Data", "Download"]
const arquivoLista1 = [
  { nome: "Supermercado MegaMart", template: "Folha Salarial 2023", enviado_por: "Matheus", data: "2023-05-05", status: true },
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
  const {config, user} = UseAuth()

  useEffect(() => {
    async function fetchTemplates() {
      const ip = process.env.NEXT_PUBLIC_IP || "localhost";
      try {
        const response = await axios.get(`http://${ip}:8080/api/arquivo/${user.id}`, config);
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
  
  if(loading) {
    return (
    <div className="w-screen h-screen grid place-items-center bg-white">
        <CircleNotch className="h-8 w-8 text-yellow-600 animate-spin"/>
    </div>
    )
}

  function handleSearch (value: string) {
    setSearch(value)
    console.log(search)
  }

  const handleCampos = (value: keyof Arquivos | string) => {
    // Se o valor for uma string, use-o como o novo campo selecionado
    console.log(value)
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