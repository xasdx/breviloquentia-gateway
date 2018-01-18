import * as sql from "mysql"

export class Database {
  
  constructor(name: string) {
    this.db = sql.createConnection({
      host: process.env["DB_HOST"] || "localhost",
      user: process.env["DB_USER"] || "root",
      password: process.env["DB_PASS"] || null,
      database: name
    })
    this.db.connect()
  }
  
  table(name: string) {
    return new Table(name, this.db)
  }
  
  class Table {
    
    constructor(name: string, db: Database) {
      this.name = name
      this.db = db
    }
    
    cleanTable(done) {
      this.db.query(`DELETE FROM ${this.name}`, (err, res) => {
        if (err) throw err
        done()
      }
    }
  
    insertRow(obj, f) {
      this.db.query(`INSERT INTO ${this.name} SET ?`, obj, f)
    }
  
    allRows(f) {
      this.db.query(`SELECT * FROM ${this.name}`, f)
    }
  }
}
