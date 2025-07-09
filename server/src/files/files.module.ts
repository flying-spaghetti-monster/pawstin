import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FileDiskFactory } from './file.factory';

@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      imports: [FilesModule],
      useClass: FileDiskFactory,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule { }
