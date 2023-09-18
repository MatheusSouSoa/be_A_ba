import PaginaTemplateAdmin from "@/components/content/TemplatesAdmin/PaginaTemplatesAdmin";
import Content from "@/components/content/content";
import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import { useRouter } from "next/router";

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
        <title>VerdeCard | Templates</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          <PaginaTemplateAdmin/>
        </div>
      </div>
    </>
  )
}