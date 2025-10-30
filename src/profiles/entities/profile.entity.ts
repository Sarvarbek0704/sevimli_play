import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({
    type: "enum",
    enum: ["uz", "ru", "en"],
    nullable: true,
  })
  language: string;

  @Column({
    type: "enum",
    enum: ["0+", "6+", "12+", "16+", "18+"],
    default: "0+",
  })
  maturityLevel: string;

  @Column({ default: false })
  isDefault: boolean;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
