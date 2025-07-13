import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_url')
export class UserUrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'original_url' })
  original_url: string

  @Column({ name: 'user_id' })
  user_id: string

  @Column({ name: 'short_url' })
  short_url: string

  @Column({ name: 'created_at' })
  created_at: Date

  @Column({ name: 'updated_at' })
  updated_at: Date

  @Column({ name: 'active', default: true })
  active: boolean

  @Column({ name: 'deleted_at', nullable: true })
  deleted_at: Date

  @Column({ name: 'request_count', default: 0 })
  request_count: number
}
