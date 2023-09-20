import PaginaLogin from "@/components/login/LoginPage";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {

  // const router = useRouter();

  //   useEffect(() => {
  //   const usuarioString = localStorage.getItem("currentUser");
  //   if (usuarioString) {
  //     const usuario = JSON.parse(usuarioString);

  //     // Verifique se o usuário tem acesso à rota "/admin/dashboard"
  //     if (!usuario.isAdmin) {
  //       // Redirecione para a rota "/templates" se o acesso não for concedido
  //       router.replace("/templates")
  //     }
  //     else {
  //       router.replace("/admin/dashboard")
  //     }
  //   } else {
  //     // Lidar com o caso em que 'usuarioString' é nulo
  //     console.log("Nenhum usuário encontrado no localStorage");
  //     router.push('/');
  //   }
  // }, [router]);
  
  return (
    <div>
      <PaginaLogin/>
    </div>
  )
}
