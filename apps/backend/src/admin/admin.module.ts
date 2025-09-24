import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserService } from '@/user/user.service';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [UserService, AuthService],
  exports: [UserService],
})
export class AdminModule {}
