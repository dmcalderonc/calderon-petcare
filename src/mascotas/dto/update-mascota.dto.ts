import { IsString, IsOptional, IsNotEmpty, IsUUID, IsInt, IsBoolean } from 'class-validator';

export class UpdateMascotaDto {
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