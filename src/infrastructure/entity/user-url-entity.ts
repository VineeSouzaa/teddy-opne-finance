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

  @Column({ default: true })
  active: boolean

  @Column({ nullable: true })
  deletedAt: Date

  @Column({ default: 0 })
  requestCount: number
}
