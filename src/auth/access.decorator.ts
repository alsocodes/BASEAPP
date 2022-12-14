import { SetMetadata } from '@nestjs/common';
import { Access } from 'prisma/access.enum';

export const ACCESS_KEY = 'access';
export const CanAccess = (...accesses: Access[]) => SetMetadata(ACCESS_KEY, accesses);
