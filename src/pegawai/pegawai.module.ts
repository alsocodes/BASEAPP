import { Module } from '@nestjs/common';
import { PegawaiService } from './pegawai.service';
import { PegawaiController } from './pegawai.controller';

@Module({
  providers: [PegawaiService],
  controllers: [PegawaiController]
})
export class PegawaiModule {}
