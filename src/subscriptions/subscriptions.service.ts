import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subscription } from "./entities/subscription.entity";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto
  ): Promise<Subscription> {
    const subscription = this.subscriptionsRepository.create(
      createSubscriptionDto
    );
    return await this.subscriptionsRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionsRepository.find({
      relations: ["user", "plan"],
    });
  }

  async findOne(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionsRepository.findOne({
      where: { id },
      relations: ["user", "plan"],
    });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }
    return subscription;
  }

  async findByUserId(userId: number): Promise<Subscription[]> {
    return await this.subscriptionsRepository.find({
      where: { userId },
      relations: ["plan"],
    });
  }

  async update(
    id: number,
    updateSubscriptionDto: UpdateSubscriptionDto
  ): Promise<Subscription> {
    await this.subscriptionsRepository.update(id, updateSubscriptionDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const subscription = await this.findOne(id);
    await this.subscriptionsRepository.remove(subscription);
  }
}
