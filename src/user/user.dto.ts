import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
	@ApiProperty({ description: '名称' })
	@IsNotEmpty()
	name: string

	@ApiProperty({ description: '密码' })
	@IsOptional()
	password: string
}