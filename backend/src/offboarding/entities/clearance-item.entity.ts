import { ClearanceItemStatus } from '../enums/clearance-item-status.enum';
import { ClearanceChecklist } from './clearance-checklist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClearanceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClearanceChecklist, checklist => checklist.items)
  checklist: ClearanceChecklist;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ClearanceItemStatus,
    default: ClearanceItemStatus.PENDING,
  })
  status: ClearanceItemStatus;
}
