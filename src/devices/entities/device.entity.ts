import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Profile } from "../../profiles/entities/profile.entity";

@Entity("devices")
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profileId: number;

  @Column({
    type: "enum",
    enum: ["mobile", "pc", "TV"],
    default: "mobile",
  })
  deviceType: string;

  @Column({ nullable: true })
  deviceName: string;

  @Column({
    type: "enum",
    enum: ["android", "ios", "windows", "linux"],
    default: "android",
  })
  os: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  lastSeenAt: Date;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.id)
  profile: Profile;
}
