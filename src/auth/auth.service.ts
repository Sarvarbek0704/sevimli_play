import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { AdminsService } from "../admins/admins.service";
import { LoginDto } from "./dto/login.dto";
import { User } from "../users/entities/user.entity";
import { Admin } from "../admins/entities/admin.entity";

interface AuthResult {
  id: number;
  email: string;
  password: string;
  userType: "user" | "admin";
  role?: string;
  fullName?: string;
  phone?: string;
  isEmailVerified?: boolean;
  isCreator?: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private adminsService: AdminsService,
    private jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto): Promise<AuthResult | null> {
    const { email, password } = loginDto;

    let userData: User | Admin | null =
      await this.usersService.findByEmail(email);
    let userType: "user" | "admin" = "user";

    if (!userData) {
      userData = await this.adminsService.findByEmail(email);
      userType = "admin";
    }

    if (!userData) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return null;
    }

    if (userType === "user") {
      const user = userData as User;
      return {
        id: user.id,
        email: user.email,
        password: user.password,
        userType: "user",
        phone: user.phone,
        isEmailVerified: user.isEmailVerified,
      };
    } else {
      const admin = userData as Admin;
      return {
        id: admin.id,
        email: admin.email,
        password: admin.password,
        userType: "admin",
        role: admin.role,
        fullName: admin.fullName,
        isCreator: admin.isCreator,
      };
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {
      email: user.email,
      sub: user.id,
      userType: user.userType,
      role: user.role,
    };

    const { password, ...userWithoutPassword } = user;

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}
