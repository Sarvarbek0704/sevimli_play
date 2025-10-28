import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AdminsModule } from "./admins/admins.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT!) || 5432,
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "your_database",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    UsersModule,
    AdminsModule,
    AuthModule,
  ],
})
export class AppModule {}
