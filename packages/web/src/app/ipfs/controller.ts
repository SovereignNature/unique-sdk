import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  Body,
  HttpStatus,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { SdkValidationPipe } from '../validation';
import { WebExceptionsFilter } from '../utils/exception-filter';
import { IpfsUploadResponse } from '../types/requests';
import { FileUploader } from './uploader/FileUploader';
import { ZipUploader } from './uploader/ZipUploader';

@UsePipes(SdkValidationPipe)
@UseFilters(WebExceptionsFilter)
@ApiTags('ipfs')
@Controller('ipfs')
export class IpfsController {
  constructor(
    private readonly fileUploader: FileUploader,
    private readonly zipUploader: ZipUploader,
  ) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: IpfsUploadResponse })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file,
    @Body() body,
    @Res({ passthrough: true }) response,
  ): Promise<IpfsUploadResponse> {
    return this.fileUploader.upload(file);
  }

  @Post('upload-zip')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: IpfsUploadResponse })
  @UseInterceptors(FileInterceptor('file'))
  async uploadZip(
    @UploadedFile() file,
    @Body() body,
    @Res({ passthrough: true }) response,
  ): Promise<IpfsUploadResponse> {
    return this.zipUploader.upload(file);
  }
}
