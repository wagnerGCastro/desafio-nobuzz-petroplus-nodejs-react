import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type IsDoneEnum = 0 | 1;

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'is_done', type: 'enum', enum: [0, 1], default: 0 })
  isDone: IsDoneEnum;

  @Column({ name: 'completed_date', type: 'datetime', nullable: true })
  completedDate: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  constructor(todo?: Partial<TodoEntity>) {
    this.id = todo?.id;
    this.name = todo?.name;
    this.description = todo?.description;
    this.isDone = todo?.isDone;
    this.completedDate = todo?.completedDate;
    this.createdAt = todo?.createdAt;
    this.updatedAt = todo?.updatedAt;
    this.deletedAt = todo?.deletedAt;
  }
}
