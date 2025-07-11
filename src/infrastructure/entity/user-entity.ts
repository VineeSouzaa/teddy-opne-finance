import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  password: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column()
  token: string
}