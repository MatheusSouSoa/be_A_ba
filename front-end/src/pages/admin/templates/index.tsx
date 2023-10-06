import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircleNotch } from "phosphor-react";

const camposTemplate = ["Nome", "Formato", "Campos", "Criado por", "Ativo"];

interface Template {
  nome: string;
  formato: string;
  campos: number;
  criado_por: string;
  status: boolean;
  isNew: boolean;
  pendentes?: string;
}

export default function AdminTemplates() {
  const [templateReq, setTemplateReq] = useState<Template[]>([]);
  const [search, setSearch] = useState("");
  const [campoSelecionado, setCampoSelecionado] = useState<keyof Template>("nome");
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    async function fetchTemplates() {
      const ip = process.env.NEXT_PUBLIC_IP || "localhost";

      try {
        const response = await axios.get(`http://${ip}:8080/api/template/getAll`);
        if (response.status === 200) {
          setTemplateReq(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Marca o carregamento como concluído
      }
    }

    fetchTemplates();
  }, []);

  function handleSearch(value: string) {
    setSearch(value);
  }

  const handleCampos = (value: keyof Template | string) => {
    // Resto do seu código de manipulação de campos...
  };

  // Renderiza o componente apenas quando os dados estiverem prontos
  if (loading) {
    return (
      <div className="w-screen h-screen grid place-items-center bg-white">
        <CircleNotch className="h-8 w-8 text-yellow-600 animate-spin"/>
      </div>
    )
  }

  const filtered = search
    ? templateReq.filter((item: { [x: string]: any }) => {
        return String(item[campoSelecionado]).toLowerCase().includes(search.toLowerCase());
      })
    : templateReq;

  const sorted = filtered.sort((a, b) => {
    const fieldA = String(a[campoSelecionado]).toLowerCase();
    const fieldB = String(b[campoSelecionado]).toLowerCase();

    return fieldA.localeCompare(fieldB);
  });

  // console.log("index: ",filtered)

  return (
    <>
      <Head>
        <title>GreenLight | Templates</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header />
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side />
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
  );
}
