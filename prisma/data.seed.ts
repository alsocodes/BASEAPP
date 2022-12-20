import { Access } from './access.enum';

export const listCabang = [
  {
    kode: 'SB1',
    nama: 'Kantor Karang Asem',
    alamat: 'Jl Karang Asem IV No 34A Surabaya',
  },
  {
    kode: 'SB2',
    nama: 'Klinik L`Viors Kayoon',
    alamat: 'Jl Kayun Surabaya',
  },
  {
    kode: 'SB3',
    nama: 'Klinik L`Viors Beverly',
    alamat: 'Jl HR Mohammad Surabaya',
  },
];

export const listProgram = [
  {
    kode: 'BASEAPP',
    nama: 'Base App',
    keterangan: 'Program Utama untuk service user dll',
    listAkses: Object.values(Access).filter((a) => a.includes(`BASEAPP_`), []),
  },
];

export const listGroupAkses = [
  {
    nama: 'SUPERADMIN',
    keterangan: 'GROUP FULL AKSES SEMUA PROGRAM',
    listAkses: listProgram.reduce((a, b) => {
      return [...a, ...b.listAkses];
    }, []),
  },
];

export const listPegawai = [
  {
    cabangId: 1,
    kode: 'SB1MIT001',
    nama: 'Johanes',
    alamat: 'Surabaya',
    tglLahir: new Date('1980-01-01'),
    telp: '0822123123',
    email: 'han@gmail.com',
    tglMasuk: new Date('2000-01-01'),
    tglKontrakPertama: new Date('2000-01-01'),
    tglKeluar: null,
    jabatan: 'Chief IT',
    user: {
      email: 'superadmin@gmail.com',
      username: 'superadmin',
      passwordPlain: '123456',
      saltRound: 10,
      groupAksesId: 1,
      listAkses: [],
      listProgram: ['BASEAPP'],
    },
  },
];
