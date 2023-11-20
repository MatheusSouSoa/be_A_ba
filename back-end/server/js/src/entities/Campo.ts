import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Template } from './Template';

@Entity({ name: 'Campos' })
export class Campo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: false })
  tipo: string;

  @Column({ nullable: false })
  nulo: boolean;

  @ManyToOne(() => Template, (template) => template.campos)
  @JoinColumn({ name: 'id_template' })
  template: Template;
}
