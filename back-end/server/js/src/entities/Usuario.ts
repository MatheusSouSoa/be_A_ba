// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Template } from './Template';

@Entity({name: "Usuarios"})
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "text", nullable: false })
  nome: string;

  @Column({type: "text", nullable: false, unique: true })
  matricula: string;

  @Column({ nullable: false })
  isAdmin: boolean;

  @Column({ nullable: false })
  isNew: boolean;

  @Column({type: "text", nullable: false, unique: true})
  email: string;

  @Column({type: "text", nullable: false })
  senha: string

  @OneToMany(() => Template, (template) => template.usuario)
  templates: Template[];
  
}
