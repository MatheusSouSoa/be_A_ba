// src/entities/Upload.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Template } from './Template';

@Entity({name: "Uploads"})
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "text", nullable: false })
  nome: string;

  @Column({ nullable: false })
  data: Date;

  @Column({ nullable: false })
  qtd_linhas: number;

  @Column({type: "text", nullable: false })
  path: string;

  @ManyToOne(() => Template, (template) => template.uploads)
  @JoinColumn({name: "id_template"})
  template: Template;
}
