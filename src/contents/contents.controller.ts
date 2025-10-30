import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { ContentsService } from "./contents.service";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AdminAuthGuard } from "../auth/guards/admin-auth.guard";

@Controller("contents")
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentsService.create(createContentDto);
  }

  @Get()
  findAll() {
    return this.contentsService.findAll();
  }

  @Get("type/:type")
  findByType(@Param("type") type: string) {
    return this.contentsService.findByType(type);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.contentsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  update(@Param("id") id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentsService.update(+id, updateContentDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  remove(@Param("id") id: string) {
    return this.contentsService.remove(+id);
  }
}
