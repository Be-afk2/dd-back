import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	MaxLength,
	MIN,
	Min,
    ValidateNested,
} from 'class-validator';

export class CreateRazaDto {
	@IsString()
	@MaxLength(40)
	nombre: string;

    @IsString()
	@MaxLength(2500)
	descripcion: string;

    @IsArray()
	@ValidateNested({ each: true })
	@Type(() => afinidad)
	afinidad?: afinidad[];

	@IsNumber()
	@Min(1)
	xp_nivel: number

	@IsNumber()
	@Min(1)
	xp_recompenza: number

}



class afinidad{

    @IsNumber()
    stack : number

    @IsNumber()
    @IsPositive()
    @Min(0)
    stack_id: number

	@IsString()
	@MaxLength(40)
	nombre: string;
}