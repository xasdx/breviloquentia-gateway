import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Service {

  public static create(name: string, path: string, url: string) {
    let service = new Service()
    service.name = name
    service.path = path
    service.url = url
    return service
  }

  @PrimaryGeneratedColumn("uuid")
  public id: string

  @Column({ type: "varchar", length: 255 })
  public name: string

  @Column({ type: "varchar", length: 255 })
  public path: string

  @Column({ type: "varchar", length: 255 })
  public url: string
}
