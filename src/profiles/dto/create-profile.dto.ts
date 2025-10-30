import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
} from "class-validator";

export class CreateProfileDto {
  @IsNumber()
  userId: number;

  @IsString()
  displayName: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsEnum(["uz", "ru", "en"])
  @IsOptional()
  language?: string;

  @IsEnum(["0+", "6+", "12+", "16+", "18+"])
  @IsOptional()
  maturityLevel?: string;

  @IsBoolean()
  @IsOptional()
  isDefault?: boolean;
}
