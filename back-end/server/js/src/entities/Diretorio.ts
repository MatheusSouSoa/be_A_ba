import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from './Usuario';

@Entity({name: "Diretorios"})
export class Diretorio {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({type: "text", nullable: false })
    nome: string;

    @Column({type: "text", nullable: false })
    caminho: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.templates)
    @JoinColumn({name: 'id_usuario'})
    usuario: Usuario;

    @ManyToOne(() => Diretorio, diretorio => diretorio.subdiretorios, { nullable: true, onDelete:'CASCADE'})
    @JoinColumn({ name: 'raiz_id' })
    raiz: Diretorio;
  
    @OneToMany(() => Diretorio, diretorio => diretorio.raiz, { onDelete: 'CASCADE' })
    subdiretorios: Diretorio[];
}