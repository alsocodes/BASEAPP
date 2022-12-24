import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateCabangDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  kode: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  nama: string;

  @IsNotEmpty()
  @IsString()
  @Length(20, 200)
  alamat: string;
}
