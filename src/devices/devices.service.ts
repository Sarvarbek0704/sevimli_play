import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Device } from "./entities/device.entity";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: Repository<Device>
  ) {}

  async create(createDeviceDto: CreateDeviceDto): Promise<Device> {
    const device = this.devicesRepository.create(createDeviceDto);
    return await this.devicesRepository.save(device);
  }

  async findAll(): Promise<Device[]> {
    return await this.devicesRepository.find({
      relations: ["profile"],
    });
  }

  async findOne(id: number): Promise<Device> {
    const device = await this.devicesRepository.findOne({
      where: { id },
      relations: ["profile"],
    });
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
    return device;
  }

  async findByProfileId(profileId: number): Promise<Device[]> {
    return await this.devicesRepository.find({
      where: { profileId },
      relations: ["profile"],
    });
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Device> {
    await this.devicesRepository.update(id, updateDeviceDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const device = await this.findOne(id);
    await this.devicesRepository.remove(device);
  }
}
