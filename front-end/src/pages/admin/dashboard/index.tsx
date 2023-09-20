import PaginaDashboard from "@/components/content/dashboard/PaginaDashboard";
import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import { useRouter } from "next/router";
import { CircleNotch } from "phosphor-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {

//   const [isLoading, setIsLoading] = useState(true)
  
//   const router = useRouter();

//  useEffect(() => {
//   const storageData = localStorage.getItem("currentUser")
//   const usuario = storageData ? JSON.parse(storageData) : null
//     if(!usuario) {
//       router.push("/")
//       return
//     }
//     // Verifique se o usuário tem acesso à rota "/admin/dashboard"
//     if (!usuario.permissions.includes("/admin/dashboard")) {
//       // Redirecione para a rota "/templates" se o acesso não for concedido
//       router.push("/templates")
//       return
//     }

//     setIsLoading(false)
//   }, []);

//   if(isLoading) {
//     return (
//       <div className="w-screen h-screen grid place-items-center bg-white">
//         <CircleNotch className="h-8 w-8 text-yellow-600 animate-spin"/>
//       </div>
//     )
//   }

  return (
    <>
      <Head>
        <title>GreenLight | Dashboard</title>
      </Head>    
        <div className="h-screen w-screen max-h-full max-w-full">
          <Header />
          <div className="flex bg-zinc-300 h-full w-full main-content">
            <Side />
            <PaginaDashboard />
          </div>
        </div>
    </>
  );

}








