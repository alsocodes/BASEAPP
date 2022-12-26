import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCabangDto {
  @IsNotEmpty({ message: 'Kode harus diisi' })
  @IsString({ message: 'Kode harus berupa string' })
  @Length(3, 5, { message: 'Kode harus 3 - 5 karakter' })
  kode: string;

  @IsNotEmpty({ message: 'Nama harus diisi' })
  @IsString({ message: 'Nama harus string' })
  @Length(5, 30, { message: 'Nama harus 5 - 30 karakter' })
  nama: string;

  @IsNotEmpty({ message: 'Alamat harus diisi' })
  @IsString({ message: 'Alamat harus berupa string' })
  @Length(10, 200, { message: 'Alamat harus 10 - 200 karakter' })
  alamat: string;
}
