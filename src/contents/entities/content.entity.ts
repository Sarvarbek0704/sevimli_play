import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("contents")
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ["movie", "series"],
  })
  type: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "date", nullable: true })
  releaseDate: Date;

  @Column({
    type: "enum",
    enum: ["uz", "ru", "en"],
    nullable: true,
  })
  language: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  durationMinutes: number;

  @Column({
    type: "enum",
    enum: ["0+", "6+", "12+", "16+", "18+"],
    default: "0+",
  })
  maturityLevel: string;

  @Column({ default: true })
  isPublished: boolean;

  @Column({ nullable: true })
  trailerUrl: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
