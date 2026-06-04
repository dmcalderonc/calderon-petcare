import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateEspecieDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsNotEmpty()
  @IsString()
  codigo?: string;

}