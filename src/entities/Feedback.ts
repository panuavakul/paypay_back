import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { PPPerformance } from "./PPPerformance";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  points: number;

  @Column()
  comment: string;

  @ManyToOne(type => User, (user: User) => user.feedbacks)
  user: User;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(
    type => PPPerformance,
    (performance: PPPerformance) => performance.feedbacks
  )
  performance: PPPerformance;

  @Column({ nullable: false })
  performanceId: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: number;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
