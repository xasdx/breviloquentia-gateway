import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Service {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ type: "varchar", length: 255 })
  name: string
}
