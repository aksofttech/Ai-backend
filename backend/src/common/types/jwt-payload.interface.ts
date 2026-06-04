import { UserRole } from '../enums/role.enum';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  tenantId: string;
}

export class AuthenticatedUser {
  id: string;
  email: string;
  role: UserRole;
  tenantId: string;
}
