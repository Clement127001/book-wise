import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { SuperadminController } from './superadmin.controller';
import { SuperadminService } from './superadmin.service';
import { AuthService } from '@/auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [SuperadminController],
  providers: [SuperadminService, AuthService],
  exports: [SuperadminService],
})
export class SuperAdminModule {}
