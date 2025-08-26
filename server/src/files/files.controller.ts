import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  Query,
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
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @ApiBody({
    description: 'Generate temporary link to access a file',
    type: '/uploads/image/example.jpeg',
  })
  @Get('generate-link/:filename')
  async generateTemporaryLink(
    @Param('filename') filename: string,
    @Request() req,
  ) {
    const diskPath = this.filesService.getDiskPath();
    const filepath = join(diskPath, filename);

    if (!existsSync(filepath)) {
      throw new NotFoundException(`${filename} not found`);
    }

    const baseUrl = req.protocol + '://' + req.get('host');
    const url = this.filesService.generateTemporaryUrl(filename, 300, baseUrl);

    return { url };
  }

  @ApiBody({
    description: 'Access a file using a temporary link',
    type: '/files/secure/example.jpeg?token=<token>',
  })
  @Get('secure/:filename')
  async getFileSecure(
    @Param('filename') filename: string,
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    let payload;
    try {
      payload = this.filesService.verifyToken(token);
    } catch {
      throw new NotFoundException('Invalid or expired link');
    }

    if (payload.filename !== filename) {
      throw new NotFoundException('File mismatch');
    }

    const diskPath = this.filesService.getDiskPath();
    const filepath = join(diskPath, filename);

    if (!existsSync(filepath)) {
      throw new NotFoundException(`${filename} not found`);
    }

    res.sendFile(filepath);
  }

  @ApiBody({
    description: 'Upload an image file (jpg, jpeg, png) max 5MB',
    type: 'multipart/form-data',
  })
  @ApiConsumes('multipart/form-data')
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
    return this.filesService.generateTemporaryUrl(file.filename, 300, baseUrl);
  }

}
