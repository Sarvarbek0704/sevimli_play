import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Subscription } from "../../subscriptions/entities/subscription.entity";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  subscriptionId: number;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column()
  amount: number;

  @Column({
    type: "enum",
    enum: ["USD", "UZS", "RUB"],
    default: "USD",
  })
  currency: string;

  @Column({
    type: "enum",
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  })
  status: string;

  @Column({ type: "timestamptz", nullable: true })
  paidAt: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Subscription, (subscription) => subscription.id)
  subscription: Subscription;
}
