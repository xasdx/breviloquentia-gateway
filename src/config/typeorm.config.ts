import { createConnection, Connection } from "typeorm"

export default async function (): Promise<Connection> {
  return await createConnection({
    type: "mysql",
    host: process.env["DB_HOST"] || "mysql",
    port: 3306,
    username: process.env["DB_USER"] || "root",
    password: process.env["DB_PASS"] || null,
    database: "test",
    entities: [__dirname + "/../**/*.model.ts"],
    synchronize: true
  })
}
