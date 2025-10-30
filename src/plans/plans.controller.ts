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
import { PlansService } from "./plans.service";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { UpdatePlanDto } from "./dto/update-plan.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AdminAuthGuard } from "../auth/guards/admin-auth.guard";

@Controller("plans")
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.plansService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  update(@Param("id") id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(+id, updatePlanDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  remove(@Param("id") id: string) {
    return this.plansService.remove(+id);
  }
}
