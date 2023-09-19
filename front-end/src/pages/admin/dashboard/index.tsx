import PaginaDashboard from "@/components/content/dashboard/PaginaDashboard";
import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();

  const [hasAccess, setHasAccess] = useState(true)

  useEffect(() => {
    const usuarioString = localStorage.getItem("currentUser");
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);

      // Verifique se o usuário tem acesso à rota "/admin/dashboard"
      if (!usuario.permissions.includes("/admin/dashboard")) {
        // Redirecione para a rota "/templates" se o acesso não for concedido
        setHasAccess(false)
        router.replace("/templates")
      }
    } else {
      // Lidar com o caso em que 'usuarioString' é nulo
      console.log("Nenhum usuário encontrado no localStorage");
      router.push('/');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>VerdeCard | Dashboard</title>
      </Head>
      {hasAccess ? (
        <div className="h-screen w-screen max-h-full max-w-full">
          <Header />
          <div className="flex bg-zinc-300 h-full w-full main-content">
            <Side />
            <PaginaDashboard />
          </div>
        </div>
      ) : null}
    </>
  );

}








