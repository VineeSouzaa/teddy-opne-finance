import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_url')
export class UserUrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  originalUrl: string

  @Column()
  userId: string

  @Column()
  shortUrl: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column()
  active: boolean

  @Column()
  deletedAt: Date
}
