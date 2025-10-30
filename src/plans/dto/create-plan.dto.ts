import { IsString, IsNumber, IsOptional, IsEnum } from "class-validator";

export class CreatePlanDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  billingPeriod?: string;

  @IsEnum(["SD", "HD", "FHD", "UHD"])
  @IsOptional()
  videoQuality?: string;

  @IsNumber()
  @IsOptional()
  maxProfiles?: number;

  @IsNumber()
  @IsOptional()
  concurrentStreams?: number;
}
