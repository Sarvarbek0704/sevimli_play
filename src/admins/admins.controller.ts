import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AdminAuthGuard } from "../auth/guards/admin-auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller("admins")
@UseGuards(JwtAuthGuard, AdminAuthGuard)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @Roles("superadmin")
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @Roles("superadmin", "moderator")
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  @Roles("superadmin", "moderator")
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(":id")
  @Roles("superadmin")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @Roles("superadmin")
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
