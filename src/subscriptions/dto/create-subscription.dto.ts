import { IsNumber, IsEnum, IsOptional, IsBoolean } from "class-validator";

export class CreateSubscriptionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  planId: number;

  @IsEnum(["active", "expired", "pending", "canceled"])
  @IsOptional()
  status?: string;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  autoRenew?: boolean;
}
