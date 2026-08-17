import type { User } from "../types/domain.types";
import type { AuthUserDTO, CurrentUserDTO } from "../types/api.types";

export const mapAuthUserDTO = (dto: AuthUserDTO): User => ({
  id: dto._id,
  name: dto.name,
  email: dto.email,
  role: dto.role,
  avatar: dto.avatar,
  isVerified: dto.isVerified,
  isActive: dto.isActive,
});

export const mapCurrentUserDTO = (dto: CurrentUserDTO): User => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
  role: dto.role,
  avatar: dto.avatar,
  isVerified: dto.meta.isVerified,
  isActive: dto.isActive,
});
