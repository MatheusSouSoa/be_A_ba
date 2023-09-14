import Content from "@/components/content/content";
import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";

export default function AdminUsuarios() {
  return (
    <>
      <Head>
        <title>VerdeCard | Usuários</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          <Content/>
        </div>
      </div>
    </>
  )
}
