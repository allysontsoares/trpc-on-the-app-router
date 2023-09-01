// import { eq } from "drizzle-orm";
// import { drizzle } from "drizzle-orm/mysql2";
// import { migrate } from "drizzle-orm/mysql2/migrator";
// import { z } from "zod";
// import mysql from "mysql2/promise";

// import { publicProcedure, router } from "./trpc";
// import { wlLabLaboratorios } from "@/db/schema";


// const poolConnection = await mysql.createPool(
//   process.env.DB_URL as string
// );
 
// const db = drizzle(poolConnection);

// migrate(db, { migrationsFolder: "drizzle" });

// export const appRouter = router({
//   hello: publicProcedure
//   .input(z.object({ text: z.string() }))
//   .query(({ input }) => {
//     return {
//       greeting: `Hello ${input.text}`
//     };
//   }),

// getExample: publicProcedure.query(({ ctx }) => {
//   return "you can now see this message!";
// }),

//   getLaboratorios: publicProcedure.query(async () => {
//     return await db.select().from(wlLabLaboratorios)
//   })
// });

// export type AppRouter = typeof appRouter;
