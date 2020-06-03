import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
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

  @OneToMany(type => Feedback, (feedback: Feedback) => feedback.user)
  feedbacks: Feedback[];

  static fromJson(json: any): User {
    const user = new User();
    user.firstName = json.firstName;
    user.lastName = json.lastName;
    return user;
  }
}
