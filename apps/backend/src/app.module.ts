import { Module } from '@nestjs/common';
import mikroOrmConfig from 'mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import configuration from '@/configuration/configuration';
import { validate } from '@/configuration/env.validator';
import { UserAuthModule } from '@/user-auth/user-auth.module';
import { AdminAuthModule } from '@/admin-auth/admin-auth.module';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';
import { UploadModule } from './upload/upload.module';
import { GenreModule } from './genre/genre.module';
import { BookModule } from './book/book.module';
import { AdminModule } from './admin/admin.module';
import { SuperAdminModule } from './superadmin/superadmin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validate }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    AuthModule,
    UserAuthModule,
    AdminAuthModule,
    AdminModule,
    UserModule,
    UploadModule,
    GenreModule,
    BookModule,
    SuperAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
