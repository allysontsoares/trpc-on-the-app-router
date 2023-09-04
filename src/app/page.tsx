

import { serverClient } from "./_trpc/serverClient";


import { trpc } from "./_trpc/client";
import LaboratoriosList from "@/components/laboratoriosList";

export  default async function Home() {
  
  //const hello = trpc.hello.useQuery({ text: "from tRPC" });
  const laboratorios = await serverClient.getLaboratorios();

  return (
    <main className="max-w-3xl mx-auto mt-5">
      {/* <p>
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p> */}
            <div>Teste</div>
             <LaboratoriosList initialLabs={laboratorios} />
    </main>
  );
}
