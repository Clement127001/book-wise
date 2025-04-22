import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/configuration/configuration';
import { validate } from '@/configuration/env.validator';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserAuthModule } from '@/user-auth/user-auth.module';
import mikroOrmConfig from 'mikro-orm.config';
import { AdminAuthModule } from '@/admin-auth/admin-auth.module';
import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';
import { UploadModule } from './upload/upload.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validate }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    AuthModule,
    UserAuthModule,
    AdminAuthModule,
    UserModule,
    UploadModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
