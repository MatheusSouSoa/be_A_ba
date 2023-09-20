import PaginaTemplateAdmin from "@/components/util/LayoutDefault/DefaultLayout";
import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import { useRouter } from "next/router";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";

const camposTemplate = ["Nome", "Formato", "Campos",  "Criado por", "Ativo"]
const templateLista = [
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: false},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
    {nome: "Loja A", formato: "csv",  campos: 6, criado_por: "Matheus", status: true},
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

export default function AdminTemplates() {

  const router = useRouter();

  if (typeof window !== "undefined") {
    const usuarioString = localStorage.getItem("currentUser");
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      
      console.log(usuarioString)
    } else {
      // Lidar com o caso em que 'usuarioString' é nulo
      console.log("Nenhum usuário encontrado no localStorage");
      router.push('/')
    }
  }
  return (
    <>
      <Head>
        <title>GreenLight | Templates</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          <DefaultLayout listaCampos={camposTemplate} listaObj={templateLista} titulo="Templates disponível:"/>
        </div>
      </div>
    </>
  )
}