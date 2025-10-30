import { IsNumber, IsEnum, IsOptional, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  subscriptionId?: number;

  @IsString()
  @IsOptional()
  provider?: string;

  @IsString()
  @IsOptional()
  transactionId?: string;

  @IsNumber()
  amount: number;

  @IsEnum(["USD", "UZS", "RUB"])
  @IsOptional()
  currency?: string;

  @IsEnum(["pending", "paid", "failed", "refunded"])
  @IsOptional()
  status?: string;

  @IsOptional()
  paidAt?: Date;
}
