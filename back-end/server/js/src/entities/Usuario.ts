// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Template } from './Template';
import { Upload } from './Upload';
import { Diretorio } from './Diretorio';

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

  @OneToMany(() => Template, (template) => template.usuario, {onDelete: "CASCADE"})
  templates: Template[];
  
  @OneToMany(() => Upload, (upload) => upload.usuario, {onDelete: "CASCADE"})
  uploads: Upload[];
  
  @OneToMany(() => Diretorio, (diretorio) => diretorio.usuario, {onDelete: "CASCADE"})
  diretorios: Diretorio[];
  
}
