"use client";
import { useState } from "react";

import { trpc } from "../app/_trpc/client";
import { serverClient } from "../app/_trpc/serverClient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "./ui/badge";


export default function LaboratoriosList({
  initialLabs,
}: {
    initialLabs: Awaited<ReturnType<(typeof serverClient)["getLaboratorios"]>>;
}) {
  const laboratorios = trpc.getLaboratorios.useQuery(undefined, {
    initialData: initialLabs,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const [content, setContent] = useState("");


  return (
    <div>
      <div>
      {laboratorios.data ? laboratorios.data.map((lab) => (
              <div className="text-sm" key={lab.labCod}><span>{lab.labFatNom}</span> - <span>{lab.labCod}</span></div>
            )) : "Carregando laboratórios..."}

<Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Documento</TableHead>
          <TableHead>Razão Social</TableHead>
          <TableHead>Nome Fantasia</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {laboratorios.data ? laboratorios.data.map((lab) =>  (
          <TableRow key={lab.labCod}>
            <TableCell className="font-medium">{lab.labDoc}</TableCell>
            <TableCell>{lab.labFatNom}</TableCell>
            <TableCell>{lab.labNom}</TableCell>
            <TableCell className="text-right">{(lab.labAtv = "S") ? <Badge variant="outline">Ativo</Badge> : <Badge variant="destructive">Inativo</Badge>}</TableCell>
          </TableRow>
        )) : "Carregando laboratórios..."}
      </TableBody>
    </Table>
      </div>
    </div>
  );
}