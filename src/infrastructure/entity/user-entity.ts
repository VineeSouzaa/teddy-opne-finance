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

  @Column({ nullable: true })
  deletedAt: Date

  @Column({ default: true })
  active: boolean
}
