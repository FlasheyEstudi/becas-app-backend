import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TipoBeca } from '../../TipoBeca/entities/tipo-beca.entity';
import { Requisito } from '../../Requisito/entities/requisito.entity';

@Entity()
export class DetalleRequisitosBeca {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @ManyToOne(() => TipoBeca, (tipoBeca) => tipoBeca.detalleRequisitosBeca, { eager: true })
  @JoinColumn({ name: 'tipoBecaId' })
  tipoBeca: TipoBeca;

  @ManyToOne(() => Requisito, (requisito) => requisito.detalleRequisitosBeca, { eager: true })
  @JoinColumn({ name: 'requisitoId' })
  requisito: Requisito;
}
