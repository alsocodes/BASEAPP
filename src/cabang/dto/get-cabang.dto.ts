import { IsOptional } from 'class-validator';

export class GetCabangDto {
  @IsOptional()
  page: number;

  @IsOptional()
  size: number;

  @IsOptional()
  search: string;

  @IsOptional()
  orderBy: string;

  @IsOptional()
  order: string;
}
