import { ClearanceChecklist } from './clearance-checklist.entity';
import { TerminationStatus } from '../enums/termination-status.enum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Termination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @Column({ nullable: true })
  reason: string;

  @Column({
    type: 'enum',
    enum: TerminationStatus,
    default: TerminationStatus.REQUESTED,
  })
  status: TerminationStatus;

  @OneToOne(() => ClearanceChecklist, checklist => checklist.termination)
  checklist: ClearanceChecklist;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finalizedAt: Date;
}
