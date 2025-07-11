import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_url')
export class UserUrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  url: string

  @Column()
  userId: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column()
  active: boolean
}
