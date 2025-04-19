import { AuthModule } from '@/auth/auth.module';
import { Module } from '@nestjs/common';
import { AdminAuthController } from '@/admin-auth/admin-auth.controller';
import { AdminAuthService } from '@/admin-auth/admin-auth.service';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AuthService],
  exports: [AdminAuthService],
})
export class AdminAuthModule {}
