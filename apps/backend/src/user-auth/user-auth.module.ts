import { Module } from '@nestjs/common';
import { UserAuthController } from '@/user-auth/user-auth.controller';
import { UserAuthService } from '@/user-auth/user-auth.service';

@Module({
  imports: [],
  controllers: [UserAuthController],
  providers: [UserAuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
