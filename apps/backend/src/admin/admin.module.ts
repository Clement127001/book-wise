import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserService } from '@/user/user.service';
import { AuthService } from '@/auth/auth.service';
import { AdminService } from './admin.service';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [AdminService, UserService, AuthService],
  exports: [UserService],
})
export class AdminModule {}
