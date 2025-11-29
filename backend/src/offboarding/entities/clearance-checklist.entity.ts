import { ClearanceItem } from './clearance-item.entity';
import { Termination } from './termination.entity';
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClearanceChecklist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Termination, termination => termination.checklist)
  termination: Termination;

  @OneToMany(() => ClearanceItem, item => item.checklist)
  items: ClearanceItem[];
}
