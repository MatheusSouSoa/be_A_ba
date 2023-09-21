import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import { useRouter } from "next/router";
import DefaultLayout from "@/components/util/LayoutDefault/DefaultLayout";
import { useState } from "react";


export default function AdminTemplates() {
 
  return (
    <>
      <Head>
        <title>GreenLight | Templates</title>
      </Head>
      <div className="h-screen w-screen max-h-full max-w-full">
        <Header/>
        <div className="flex bg-zinc-300 h-full w-full main-content">
          <Side/>
          asdads
        </div>
      </div>
    </>
  )
}