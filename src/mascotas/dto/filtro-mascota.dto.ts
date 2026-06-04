// src/mascotas/dto/filtro-mascota.dto.ts
import { IsOptional, IsString, IsIn, IsUUID } from 'class-validator';

export class FiltroMascotaDto {
  
  @IsOptional()
  @IsUUID('all', { message: 'El id de la especie debe ser un UUID válido' })
  especieId?: string;

  @IsOptional()
  @IsIn(['true', 'false'], { message: 'El campo vacunado debe ser true o false como texto' })
  vacunado?: string;

  @IsOptional()
  @IsString()
  buscar?: string;

  @IsOptional()
  @IsIn(['edad', 'peso'], { message: 'Solo puedes ordenar por edad o peso' })
  ordenarPor?: 'edad' | 'peso';

  @IsOptional()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'], { message: 'El orden debe ser ASC o DESC' })
  orden?: 'ASC' | 'DESC' | 'asc' | 'desc';
}