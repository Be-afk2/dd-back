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

export class CrearPersonajeDto {
	@IsString()
	@MaxLength(40)
	nombre: string;

    @IsString()
	@MaxLength(2500)
	historia: string;

    @IsArray()
	@ValidateNested({ each: true })
	@Type(() => stack)
	staks?: stack[];

	@IsNumber()
	@Min(1)
	razaId: number

}



class stack{

    @IsNumber()
    stack : number

    @IsNumber()
    @IsPositive()
    @Min(0)
    stack_id: number
}