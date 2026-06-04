import { IsNotEmpty, IsString} from 'class-validator';

export class CreateEspecieDto {
  @IsString()
  nombre?: string;

  @IsString()
  codigo?: string;

}