import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type IsDoneEnum = '0' | '1';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'is_done', type: 'enum', enum: ['0', '1'], default: '0' })
  isDone: IsDoneEnum;

  @Column({ name: 'completed_date', type: 'datetime', nullable: true })
  completedDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
