import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('users')
@Unique(['email'])
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
  deletedAt: Date

  @Column()
  active: boolean
}
