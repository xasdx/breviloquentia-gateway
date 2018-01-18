import * as sql from "mysql"

export class Database {
  
  constructor() {
    this.db = sql.createConnection({
      host: process.env["DB_HOST"] || "localhost",
      user: process.env["DB_USER"] || "root",
      password: process.env["DB_PASS"] || null,
      database: "test"
    })
    this.db.connect()
  }
  
  cleanTable(table: string, done) {
    this.db.query(`DELETE FROM ${table}`, (err, res) => {
      if (err) throw err
      done()
    }
  }
  
  insertRow(table: string, obj, f) {
    this.db.query(`INSERT INTO ${table} SET ?`, obj, f)
  }
  
  allRows(table: string, f) {
    this.db.query(`SELECT * FROM ${table}`, f)
  }
}
