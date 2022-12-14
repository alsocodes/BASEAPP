import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCabangDto } from './dto/create-cabang.dto';
import { GetCabangDto } from './dto/get-cabang.dto';
import { UpdateCabangDto } from './dto/update-cabang.dto';

@Injectable()
export class CabangService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: GetCabangDto) {
    const take = Number(query?.size) || 20;
    const page = Number(query?.page) - 1 || 0;
    const skip = page * take;
    const orderBy = query?.orderBy || 'id';
    const order = query?.order || 'asc';
    let where = {};
    if (query.search) {
      where = {
        ...where,
        OR: [
          { kode: { contains: query.search, mode: 'insensitive' } },
          { nama: { contains: query.search, mode: 'insensitive' } },
        ],
      };
    }

    const result = await this.prisma.findAndCountAll({
      table: this.prisma.cabang,
      select: {
        publicId: true,
        kode: true,
        nama: true,
        alamat: true,
        createdAt: true,
        updatedAt: true,
      },
      where,
      take: take,
      skip: skip,
      orderBy: {
        [orderBy]: order,
      },
    });

    return {
      page: page + 1,
      size: take,
      ...result,
    };
  }

  // async findByKode(kode: string) {
  //   return this.prisma.cabang.findFirst({ where: { kode: kode } });
  // }

  async findById(publicId: string) {
    return this.prisma.cabang.findFirst({ where: { publicId: publicId } });
  }

  async create(data: CreateCabangDto) {
    try {
      const conflict = await this.prisma.cabang.findFirst({
        where: {
          OR: [{ kode: data.kode }, { nama: data.nama }],
        },
      });
      if (conflict) {
        throw new ConflictException('Kode atau Nama telah digunakan');
      }

      const { publicId } = await this.prisma.cabang.create({
        data: data,
      });
      return publicId;
    } catch (error) {
      // console.log('here ', error.message);
      throw error;
    }
  }

  async update(publicId: string, data: UpdateCabangDto) {
    try {
      // check cabang is exists
      const exist = await this.findById(publicId);
      if (!exist) throw new NotFoundException('Cabang tidak ditemukan');

      const conflict = await this.prisma.cabang.findFirst({
        where: {
          OR: [{ kode: data.kode }, { nama: data.nama }],
          publicId: {
            not: publicId,
          },
        },
      });

      if (conflict) {
        throw new ConflictException('Kode atau Nama telah digunakan');
      }

      await this.prisma.cabang.update({
        where: {
          id: exist.id,
        },
        data: data,
      });
      return publicId;
    } catch (error) {
      throw error;
    }
  }

  async delete(publicId: string) {
    try {
      const exist = await this.findById(publicId);
      if (!exist) throw new NotFoundException('Cabang tidak ditemukan');
      return this.prisma.cabang.delete({ where: { id: exist.id } });
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
}
