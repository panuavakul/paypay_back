import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
  ManyToMany,
} from "typeorm";
import { PPPerformance } from "./PPPerformance";
import { Feedback } from "./Feedback";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: number;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: number;

  @OneToMany(
    type => PPPerformance,
    (performance: PPPerformance) => performance.user
  )
  performances: PPPerformance[];

  @RelationId((user: User) => user.performances)
  performanceIds: string[];

  @OneToMany(type => Feedback, (feedback: Feedback) => feedback.user)
  feedbacks: Feedback[];

  @RelationId((user: User) => user.feedbacks)
  feedbackIds: string[];

  @ManyToMany(
    () => PPPerformance,
    (performance: PPPerformance) => performance.reviewers
  )
  assigneds: PPPerformance[];

  static fromJson(json: any): User {
    const user = new User();
    user.firstName = json.firstName;
    user.lastName = json.lastName;
    return user;
  }
}
