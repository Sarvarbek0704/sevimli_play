import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "./entities/profile.entity";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profilesRepository.create(createProfileDto);
    return await this.profilesRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return await this.profilesRepository.find({
      relations: ["user"],
    });
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.profilesRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!profile) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }
    return profile;
  }

  async findByUserId(userId: number): Promise<Profile[]> {
    return await this.profilesRepository.find({
      where: { userId },
      relations: ["user"],
    });
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto
  ): Promise<Profile> {
    await this.profilesRepository.update(id, updateProfileDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.findOne(id);
    await this.profilesRepository.remove(profile);
  }
}
