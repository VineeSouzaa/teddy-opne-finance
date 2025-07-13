import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('users')
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'email' })
  email: string

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'password' })
  password: string

  @Column({ name: 'created_at' })
  created_at: Date

  @Column({ name: 'updated_at' })
  updated_at: Date

  @Column({ name: 'deleted_at', nullable: true })
  deleted_at: Date

  @Column({ name: 'active', default: true })
  active: boolean
}
