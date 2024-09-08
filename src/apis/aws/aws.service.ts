import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class AWSService {
  s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: 'ap-northeast-2', // AWS Region
      credentials: {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'), // Access Key
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'), // Secret Key
      },
    });
  }

  async uploadImageToS3(
    deleteKey: string,
    uploadKey: string,
    image: Express.Multer.File,
    ext: string, // 확장자
  ) {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: deleteKey, // 삭제할 파일 이름
    });

    await this.s3Client.send(deleteCommand);

    // AWS S3에 이미지 업로드 명령을 생성합니다. 파일 이름, 파일 버퍼, 파일 접근 권한, 파일 타입 등을 설정합니다.
    const uploadCommand = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'), // S3 버킷 이름
      Key: uploadKey, // 업로드할 파일 이름
      Body: image.buffer, // 업로드할 파일
      ACL: 'public-read', // 파일 접근 권한
      ContentType: `image/${ext}`, // 파일 타입
    });

    // 생성된 명령을 S3 클라이언트에 전달하여 이미지 업로드를 수행합니다.
    await this.s3Client.send(uploadCommand);

    // 업로드된 이미지의 URL을 반환합니다.
    // return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${imageName}`;
    return uploadKey;
  }
}
