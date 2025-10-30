import { IsNumber, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateDeviceDto {
  @IsNumber()
  profileId: number;

  @IsEnum(["mobile", "pc", "TV"])
  @IsOptional()
  deviceType?: string;

  @IsString()
  @IsOptional()
  deviceName?: string;

  @IsEnum(["android", "ios", "windows", "linux"])
  @IsOptional()
  os?: string;
}
