import { z } from "zod";

import {
  router,
  publicProcedure
} from "@/server/trpc";
import { db } from "@/db";
import { wlLabLaboratorios } from "@/db/schema";

export const LaboratoriosRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`
      };
    }),

  getExample: publicProcedure.query(({ ctx }) => {
    return "you can now see this message!";
  }),

  getLaboratorios: publicProcedure.query(async () => {
    return await db.select().from(wlLabLaboratorios)
  })
});


