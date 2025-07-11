import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { FilesService } from './files.service';
import { existsSync } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get('uploads/image/:image')
  async getImageFile(@Param('image') image: string, @Res() response: Response) {
    const diskPath = this.filesService.getDiskPath();
    const filepath = join(diskPath, image);

    const exists = existsSync(filepath);
    if (!exists) throw new NotFoundException(`${image} not found`);

    const cacheDuration = this.filesService.getImageCacheDuration();

    response.set('Cache-Control', `private, max-age=${cacheDuration}`);
    response.sendFile(filepath);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('uploads/image')
  async uploadImageFile(
    @Request() request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(jpe?g|png)$/i }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const baseUrl = request.protocol + '://' + request.get('host');
    return `${baseUrl}/assets/image/${file.filename}`;
  }


}
