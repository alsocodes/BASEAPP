import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

import { listCabang, listGroupAkses, listPegawai, listProgram } from './data.seed';
async function main() {
  for (let i in listCabang) {
    const { kode, nama, alamat } = listCabang[i];
    await prisma.cabang.upsert({
      where: {
        kode: kode,
      },
      update: {
        nama,
        alamat,
      },
      create: {
        kode,
        nama,
        alamat,
      },
    });
  }

  for (let i in listProgram) {
    const { kode, nama, keterangan, listAkses } = listProgram[i];
    const program = await prisma.program.upsert({
      where: { kode: kode },
      update: {
        nama,
        keterangan,
      },
      create: {
        kode,
        nama,
        keterangan,
      },
    });

    for (let x in listAkses) {
      const akses = `${listAkses[x]}`;
      await prisma.akses.upsert({
        where: { akses },
        update: {},
        create: {
          programId: program.id,
          akses,
        },
      });
    }
  }
  for (let i in listGroupAkses) {
    const { nama, keterangan, listAkses } = listGroupAkses[i];
    await prisma.groupAkses.upsert({
      where: { nama },
      update: { keterangan, listAkses },
      create: { nama, keterangan, listAkses },
    });
  }

  for (let i in listPegawai) {
    const {
      cabangId,
      kode,
      nama,
      alamat,
      tglLahir,
      telp,
      email,
      tglMasuk,
      tglKontrakPertama,
      tglKeluar,
      jabatan,
      user,
    } = listPegawai[i];
    const pegawai = await prisma.pegawai.upsert({
      where: { kode: kode },
      update: {
        nama,
        alamat,
        tglLahir,
        telp,
        email,
        tglMasuk,
        tglKeluar,
        tglKontrakPertama,
        jabatan,
      },
      create: {
        nama,
        alamat,
        tglLahir,
        telp,
        email,
        tglMasuk,
        tglKeluar,
        tglKontrakPertama,
        jabatan,
        cabangId,
        kode,
      },
    });

    const {
      passwordPlain,
      saltRound,
      email: userEmail,
      groupAksesId,
      listAkses,
      listProgram,
      username,
    } = user;
    const salt = await bcrypt.genSalt(saltRound);
    const password = await bcrypt.hash(passwordPlain, salt);
    await prisma.user.upsert({
      where: { pegawaiId: pegawai.id },
      update: {
        email: userEmail,
        username,
        password,
        groupAksesId,
        listAkses,
        listProgram,
      },
      create: {
        email,
        username,
        password,
        listAkses,
        listProgram,
        groupAksesId,
        pegawaiId: pegawai.id,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
