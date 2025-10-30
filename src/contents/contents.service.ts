import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Content } from "./entities/content.entity";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentsRepository: Repository<Content>
  ) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    const content = this.contentsRepository.create(createContentDto);
    return await this.contentsRepository.save(content);
  }

  async findAll(): Promise<Content[]> {
    return await this.contentsRepository.find();
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentsRepository.findOne({ where: { id } });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  async findByType(type: string): Promise<Content[]> {
    return await this.contentsRepository.find({ where: { type } });
  }

  async update(
    id: number,
    updateContentDto: UpdateContentDto
  ): Promise<Content> {
    await this.contentsRepository.update(id, updateContentDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const content = await this.findOne(id);
    await this.contentsRepository.remove(content);
  }
}
