import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  credential: string;

  @ApiProperty({
    minimum: 8,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginRes {
  @ApiProperty()
  token: string;
}
