import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	MaxLength,
	Min,
    ValidateNested,
} from 'class-validator';

export class CreateRazaDto {
	@IsString()
	@MaxLength(40)
	nombre: string;

    @IsString()
	@MaxLength(1000)
	descripcion: string;

    @IsArray()
	@ValidateNested({ each: true })
	@Type(() => afinidad)
	afinidad?: afinidad[];
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