import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
// import { Profile } from "../../profiles/entities/profile.entity";
// import { Subscription } from "../../subscriptions/entities/subscription.entity";
// import { Payment } from "../../payments/entities/payment.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  //   @OneToMany(() => Profile, (profile) => profile.user)
  //   profiles: Profile[];

  //   @OneToMany(() => Subscription, (subscription) => subscription.user)
  //   subscriptions: Subscription[];

  //   @OneToMany(() => Payment, (payment) => payment.user)
  //   payments: Payment[];
}
