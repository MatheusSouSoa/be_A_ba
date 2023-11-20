import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { Upload } from './Upload';
import { Campo } from './Campo';

@Entity({ name: 'Templates' })
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: false })
  extensao: string;

  @Column({ nullable: false })
  status: boolean;

  @Column({ nullable: false })
  isNew: boolean;

  @Column({ nullable: false })
  data: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.templates)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @OneToMany(() => Upload, (upload) => upload.template, { onDelete: 'CASCADE' })
  uploads: Upload[];

  @OneToMany(() => Campo, (campo) => campo.template)
  campos: Campo[];
}
