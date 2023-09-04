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
  const {data, isLoading, error} = trpc.getLaboratorios.useQuery(undefined, {
    initialData: initialLabs,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  const [content, setContent] = useState("");


  return (
    <div>
      <div>

<Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Identificação</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data ? data.map((lab) =>  (
          <TableRow key={lab.labCod}>
            <TableCell className="font-medium">
              <div className="flex gap-2"><span>Documento:</span> <span className="font-bold">{lab.labDoc}</span></div>
              <div className="flex gap-2 w-max">{lab.labFatNom ? <><span>Razão social:</span><span className="font-bold">{lab.labFatNom}</span></> : ""}</div>
              <div className="flex gap-2 w-max">{lab.labNom ? <><span>Nome fantasia:</span><span className="font-bold">{lab.labNom}</span></> : ""}</div>
              </TableCell>
            <TableCell className="text-right">{(lab.labAtv = "S") ? <Badge variant="outline">Ativo</Badge> : <Badge variant="destructive">Inativo</Badge>}</TableCell>
          </TableRow>
        )) : "Carregando laboratórios..."}
      </TableBody>
    </Table>
      </div>
    </div>
  );
}