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
    listAkses: [
      'CABANG_CREATE',
      'CABANG_UPDATE',
      'CABANG_READ',
      'CABANG_DELETE',
      'PROGRAM_CREATE',
      'PROGRAM_READ',
      'PROGRAM_UPDATE',
      'PROGRAM_DELETE',
      'AKSES_CREATE',
      'AKSES_READ',
      'AKSES_UPDATE',
      'AKSES_DELETE',
      'GROUPAKSES_CREATE',
      'GROUPAKSES_READ',
      'GROUPAKSES_UPDATE',
      'GROUPAKSES_DELETE',
      'USER_CREATE',
      'USER_READ',
      'USER_UPDATE',
      'USER_DELETE',
      'PEGAWAI_CREATE',
      'PEGAWAI_READ',
      'PEGAWAI_UPDATE',
      'PEGAWAI_DELETE',
    ],
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
    tglLahir: '1980-01-01',
    telp: '0822123123',
    email: 'han@gmail.com',
    tglMasuk: '2000-01-01',
    tglKontrakPertama: '2000-01-01',
    tglKeluar: null,
    jabatan: 'Chief IT',
    user: {
      email: 'superadmin@gmail.com',
      username: 'superadmin',
      groupAksesId: 1,
      listAkses: [],
      listProgram: ['BASEAPP'],
    },
  },
];
