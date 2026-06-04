import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mascota } from '../mascotas/mascota.entity';

@Entity('especies')
export class Especie { 
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  nombre!: string;

  @Column()
  codigo!: string;

  @OneToMany(() => Mascota, (mascota) => mascota.especie)
  mascotas!: Mascota[];
}