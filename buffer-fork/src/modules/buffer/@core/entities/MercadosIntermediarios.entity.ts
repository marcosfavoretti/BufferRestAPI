import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { CONSULTA } from "../../enum/CONSULTA.enum";
import { Setores } from "./Setores.entity";
import { setorDicionario } from "../const/SetorDicionario";
import { BufferHistorico } from "./BufferHistorico.entity";

@Entity()
export class MercadosIntermediario {
    @PrimaryGeneratedColumn('increment')
    idMercadosIntermediario: number;

    @Column({
        enum: CONSULTA
    })
    consulta: CONSULTA;

    @Column('varchar')
    nome: string;

    @ManyToOne(() => Setores, setor => setor.mercadosIntermediarios)
    setor: Setores;

    @OneToMany(()=> BufferHistorico, buffer=> buffer.mercado)
    histBuffer: BufferHistorico[];
}