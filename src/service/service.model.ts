import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Service {

  public static create(name: string) {
    let service = new Service()
    service.name = name
    return service
  }

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 255 })
  name: string
}
