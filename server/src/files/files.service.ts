import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DiskConfig, DiskConfigName } from 'src/configs/disk.config';
import { extname, resolve } from 'path';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) { }
  getDiskPath() {
    const diskConfig =
      this.configService.getOrThrow<DiskConfig>(DiskConfigName);
    return resolve(__dirname, '../..', diskConfig.path);
  }

  getFileName(file: Express.Multer.File) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname).toLowerCase();
    const name = file.originalname.replace(/\s/g, '-').replace(ext, '');
    return `${name}_${uniqueSuffix}${ext}`;
  }

  getImageCacheDuration() {
    const diskConfig =
      this.configService.getOrThrow<DiskConfig>(DiskConfigName);
    return diskConfig.imageCacheDuration;
  }

  generateTemporaryUrl(filename: string, expiresInSec = 300, baseUrl?: string) {
    const token = jwt.sign(
      { filename },
      process.env.FILE_TOKEN_SECRET || 'file_secret',
      { expiresIn: expiresInSec },
    );
    return `${baseUrl}/files/secure/${filename}?token=${token}`;
  }

  verifyToken(token: string): { filename: string } {
    return jwt.verify(token, process.env.FILE_TOKEN_SECRET || 'file_secret') as {
      filename: string;
    };
  }
}
