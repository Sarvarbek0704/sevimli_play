import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Subscription } from "../../subscriptions/entities/subscription.entity";

@Entity("plans")
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ default: "USD" })
  currency: string;

  @Column({ default: "monthly" })
  billingPeriod: string;

  @Column({
    type: "enum",
    enum: ["SD", "HD", "FHD", "UHD"],
    default: "HD",
  })
  videoQuality: string;

  @Column({ default: 1 })
  maxProfiles: number;

  @Column({ default: 1 })
  concurrentStreams: number;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
