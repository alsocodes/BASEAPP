import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { Access } from 'prisma/access.enum';
import { CanAccess } from 'src/auth/access.decorator';
import { CabangService } from './cabang.service';
import { CreateCabangDto } from './dto/create-cabang.dto';
import { GetCabangDto } from './dto/get-cabang.dto';
import { UpdateCabangDto } from './dto/update-cabang.dto';

@Controller('cabang')
export class CabangController {
  constructor(private cabangService: CabangService) {}
  @Get()
  @CanAccess(Access.BASEAPP_CABANG_READ)
  async get(@Query() query: GetCabangDto) {
    const result = await this.cabangService.findAll(query);
    return {
      statusCode: 200,
      message: 'Berhasil',
      result,
    };
  }

  @Post()
  @CanAccess(Access.BASEAPP_CABANG_CREATE)
  async create(@Body() createCabangDto: CreateCabangDto) {
    await this.cabangService.create(createCabangDto);
    return {
      statusCode: 201,
      message: 'Cabang berhasil dibuat',
    };
  }

  @Put('/:id')
  @CanAccess(Access.BASEAPP_CABANG_UPDATE)
  async update(@Body() updateCabangDto: UpdateCabangDto, @Param('id') id: string) {
    await this.cabangService.update(id, updateCabangDto);
    return {
      statusCode: 200,
      message: 'Cabang berhasil diupdate',
    };
  }

  @Get('/:id')
  @CanAccess(Access.BASEAPP_CABANG_READ)
  async getOne(@Param('id') publicId: string) {
    const result = await this.cabangService.findById(publicId);
    if (!result) throw new NotFoundException('Cabang tidak ditemukan');
    const { id, deletedAt, ...res } = result;
    return {
      statusCode: 200,
      message: 'Berhasil',
      result: res,
    };
  }

  @Delete('/:id')
  @CanAccess(Access.BASEAPP_CABANG_DELETE)
  async delete(@Param('id') publicId: string) {
    await this.cabangService.delete(publicId);
    return {
      statusCode: 200,
      message: 'Cabang berhasil dihapus',
    };
  }
}
