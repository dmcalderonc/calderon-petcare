


import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { FiltroMascotaDto } from './dto/filtro-mascota.dto';


@Controller('mascotas')
export class MascotasController{
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  create(@Body() createMascotaDto: CreateMascotaDto) {
    return this.mascotasService.create(createMascotaDto);
  }

  @Get() 
  findAll(@Query() filtros: FiltroMascotaDto) {
    return this.mascotasService.findAll(filtros);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    return this.mascotasService.update(id, updateMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(id);
  }
}