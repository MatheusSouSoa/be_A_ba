import PaginaDashboard from "@/components/content/dashboard/PaginaDashboard";
import Header from "@/components/header/header";
import Side from "@/components/sidebard/side";
import Head from "next/head";
import { useRouter } from "next/router";
import { CircleNotch } from "phosphor-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {

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








