import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminsRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const admin = this.adminsRepository.create({
      ...createAdminDto,
      password: hashedPassword,
    });

    return await this.adminsRepository.save(admin);
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminsRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminsRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return await this.adminsRepository.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const admin = await this.findOne(id);

    if (updateAdminDto.email && updateAdminDto.email !== admin.email) {
      const existingAdmin = await this.findByEmail(updateAdminDto.email);
      if (existingAdmin) {
        throw new ConflictException("Email already exists");
      }
    }

    const updateData: any = { ...updateAdminDto };
    if (updateAdminDto.password) {
      updateData.password = await bcrypt.hash(updateAdminDto.password, 10);
    } else {
      delete updateData.password;
    }

    await this.adminsRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const admin = await this.findOne(id);
    await this.adminsRepository.remove(admin);
  }
}
