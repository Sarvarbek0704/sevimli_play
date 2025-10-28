export class CreateAdminDto {
  email: string;
  password: string;
  fullName?: string;
  role?: "superadmin" | "moderator";
  isCreator: boolean;
}
