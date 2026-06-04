import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './mascota.entity';
import { Especie } from '../especies/especie.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { FiltroMascotaDto } from './dto/filtro-mascota.dto';

@Injectable()
export class MascotasService {
    constructor(
        @InjectRepository(Mascota)
        private readonly mascotaRepository: Repository<Mascota>,

        @InjectRepository(Especie)
        private readonly especieRepository: Repository<Especie>,
    ) { }

    async create(createMascotaDto: CreateMascotaDto) {
        const especie = await this.especieRepository.findOne({ where: { id: createMascotaDto.especieId } });
        if (!especie) throw new NotFoundException('Especie no encontrado');

        const mascota = this.mascotaRepository.create({
            nombre: createMascotaDto.nombre,
            chip: createMascotaDto.chip,
            peso: createMascotaDto.peso ?? 0,
            edad: createMascotaDto.edad ?? 0,
            vacunado: createMascotaDto.vacunado ?? true,
            especie,
        });
        return this.mascotaRepository.save(mascota);
    }


    async findAll(filtros: FiltroMascotaDto) {
        const query = this.mascotaRepository.createQueryBuilder('mascota')
            .leftJoinAndSelect('mascota.especie', 'especie');

        if (filtros.especieId) {
            query.andWhere('especie.id = :especieId', { especieId: filtros.especieId });
        }
        if (filtros.vacunado) {
            const isVacunado = filtros.vacunado === 'true';
            query.andWhere('mascota.vacunado = :isVacunado', { isVacunado });
        }

        if (filtros.buscar) {
            query.andWhere(
                '(mascota.nombre ILIKE :buscar OR mascota.chip ILIKE :buscar)',
                { buscar: `%${filtros.buscar}%` }
            );
        }

        if (filtros.ordenarPor) {
            const direccion = filtros.orden?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            query.orderBy(`mascota.${filtros.ordenarPor}`, direccion);
        }

        return await query.getMany();
    }

    async findOne(id: string) {
        const mascota = await this.mascotaRepository.findOne({ where: { id } });
        if (!mascota) throw new NotFoundException('Mascotano encontrado');
        return mascota;
    }

    async update(id: string, updateMascotaDto: UpdateMascotaDto) {
        const mascota = await this.findOne(id);

        if (updateMascotaDto.especieId) {
            const especie = await this.especieRepository.findOne({ where: { id: updateMascotaDto.especieId } });
            if (!especie) throw new NotFoundException('Especie no encontrado');
            mascota.especie = especie;
        }

        Object.assign(mascota, updateMascotaDto);
        return this.mascotaRepository.save(mascota);
    }

    async remove(id: string) {
        const mascota = await this.findOne(id);
        return this.mascotaRepository.remove(mascota);
    }
}