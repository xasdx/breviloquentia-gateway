import { createConnection, Connection } from "typeorm"

export default function (): Promise<Connection> {
  return createConnection({
    type: "postgres",
    host: process.env["DB_HOST"] || "db",
    port: 5432,
    username: process.env["DB_USER"] || "postgres",
    password: process.env["DB_PASS"] || null,
    database: "test",
    entities: [__dirname + "/../**/*.model.ts"],
    synchronize: true
  })
}
