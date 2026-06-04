import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMascotaDto {
  @IsUUID()
  especieId?: string;

  @IsString()
  nombre?: string;

  @IsString()
  chip?: string;

  @IsOptional()
  @IsInt()
  peso?: number;

  @IsOptional()
  @IsInt()
  edad?: number;

  @IsOptional()
  @IsBoolean()
  vacunado?: boolean;

}