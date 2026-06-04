import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EspeciesService } from './especies.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';

@Controller('especies')
export class EspeciesController {
  constructor(private readonly especiesService: EspeciesService) {}

  @Post()
  create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especiesService.create(createEspecieDto);
  }

  @Get()
  findAll() {
    return this.especiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especiesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEspecieDto: UpdateEspecieDto) {
    return this.especiesService.update(id, updateEspecieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especiesService.remove(id);
  }
}