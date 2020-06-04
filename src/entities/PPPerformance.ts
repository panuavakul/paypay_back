import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from "typeorm";
import { User } from "./User";
import { Feedback } from "./Feedback";

@Entity()
export class PPPerformance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  achievement: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  date: string;

  @ManyToOne(type => User, (user: User) => user.performances)
  user: User;

  @Column({ nullable: false })
  userId: string;

  @OneToMany(type => Feedback, (feedback: Feedback) => feedback.performance)
  feedbacks: Feedback[];

  @RelationId((performance: PPPerformance) => performance.feedbacks)
  feedbackIds: string[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: number;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;
}
