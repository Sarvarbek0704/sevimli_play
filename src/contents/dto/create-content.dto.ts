import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDate,
} from "class-validator";

export class CreateContentDto {
  @IsEnum(["movie", "series"])
  type: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  releaseDate?: Date;

  @IsEnum(["uz", "ru", "en"])
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsNumber()
  @IsOptional()
  durationMinutes?: number;

  @IsEnum(["0+", "6+", "12+", "16+", "18+"])
  @IsOptional()
  maturityLevel?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsString()
  @IsOptional()
  trailerUrl?: string;
}
