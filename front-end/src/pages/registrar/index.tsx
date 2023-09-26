import PaginaLogin from "@/components/login/LoginPage";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PaginaCriarConta from "@/components/register/RegisterPage";

export default function CriarContaPage() {

  const router = useRouter();
  
  return (
    <div>
      <PaginaCriarConta/>
    </div>
  )
}
