import {
  BadRequestException,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
} from '@ts-rest/nest';
import { uploadContract } from 'contract/upload/contract';
import { UploadService } from '@/upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

const uploadController = nestControllerContract(uploadContract);

export type UploadRequestShape = NestRequestShapes<typeof uploadController>;
@Controller()
export class UploadController
  implements NestControllerInterface<typeof uploadController>
{
  constructor(private readonly uploadService: UploadService) {}

  @TsRest(uploadContract.uploadMedia)
  @UseInterceptors(FileInterceptor('file'))
  async uploadMedia(@UploadedFile() file: Express.Multer.File | undefined) {
    if (file === undefined) {
      throw new BadRequestException('Please add file');
    }

    const data = await this.uploadService.uploadMedia(file);

    return {
      status: 201 as const,
      body: {
        data,
      },
    };
  }
}
