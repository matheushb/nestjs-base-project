import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Name must contain only letters',
  })
  @Transform(({ value }: { value: string }) => value.trim())
  @ApiPropertyOptional()
  name?: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
