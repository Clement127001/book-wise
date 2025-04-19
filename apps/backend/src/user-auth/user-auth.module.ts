import { Module } from '@nestjs/common';
import { UserAuthController } from '@/user-auth/user-auth.controller';
import { UserAuthService } from '@/user-auth/user-auth.service';
import { AuthModule } from '@/auth/auth.module';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [UserAuthController],
  providers: [UserAuthService, AuthService],
  exports: [UserAuthService],
})
export class UserAuthModule {}
