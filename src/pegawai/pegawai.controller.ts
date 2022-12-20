import { Controller, Get, Delete, Post, Put } from '@nestjs/common';
import { Access } from 'prisma/access.enum';
import { CanAccess } from 'src/auth/access.decorator';
import { PublicRoute } from 'src/auth/constants';

@Controller('pegawai')
export class PegawaiController {
  @Get()
  @CanAccess(Access.BASEAPP_PEGAWAI_READ)
  async get() {
    return [
      { id: 1, nama: 'satu' },
      { id: 2, nama: 'dua' },
    ];
  }

  @Post()
  @CanAccess(Access.BASEAPP_PEGAWAI_CREATE)
  async create() {}

  @Put()
  @CanAccess(Access.BASEAPP_PEGAWAI_UPDATE)
  async update() {}

  @Get('/:id')
  @CanAccess(Access.BASEAPP_PEGAWAI_READ)
  async getOne() {}

  @Delete('/:id')
  @CanAccess(Access.BASEAPP_PEGAWAI_DELETE)
  async delete() {}
}
