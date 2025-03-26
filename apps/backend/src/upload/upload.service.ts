import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  s3: AWS.S3;
  awsBucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('aws.accessKey') as string,
      secretAccessKey: this.configService.get<string>(
        'aws.secretKey',
      ) as string,
      region: this.configService.get<string>('aws.region') as string,
    });

    this.awsBucketName = this.configService.get<string>('aws.bucket') as string;
  }

  async uploadMedia(file: Express.Multer.File) {
    if (!this.awsBucketName)
      throw new InternalServerErrorException('Something went wrong!');

    let fileExtension = path.extname(file.originalname);
    let fileBuffer = file.buffer;
    let ContentType = file.mimetype;

    const isImage = file.mimetype.startsWith('image/');

    if (isImage) {
      let image = sharp(fileBuffer);
      let metadata = await image.metadata();

      if (metadata.size && metadata.size > 100000 && metadata.width) {
        const newWidth = Math.round(metadata.width / 4);
        fileBuffer = await image.resize(newWidth).toBuffer();
        image = sharp(fileBuffer);
        metadata = await image.metadata();
      }

      fileExtension = '.webp';
      ContentType = 'image/webp';
    }

    const fileName = path.parse(file.originalname).name;
    const newFileName = `${fileName}-${new Date().getTime()}${fileExtension}`;

    const data = {
      Bucket: this.awsBucketName,
      Key: newFileName,
      ContentType,
      Body: fileBuffer,
      ACL: 'public-read',
      ContentDisposition: 'attachment',
    };

    const s3Response = await this.s3.upload(data).promise();

    if (!s3Response.Location) {
      throw new BadRequestException('File not uploaded');
    }

    return {
      url: s3Response.Location,
      key: s3Response.Key,
      type: file.mimetype,
      isUploaded: true,
      message: 'File Uploaded successfully',
    };
  }
}
