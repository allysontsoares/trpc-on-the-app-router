import { z } from "zod";
import { db } from "@/db";

import { publicProcedure, router } from "@/server/trpc";


import { wlLabLaboratorios } from "@/db/schema";
import { migrate } from "drizzle-orm/mysql2/migrator";

migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = router({
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

export type AppRouter = typeof appRouter;