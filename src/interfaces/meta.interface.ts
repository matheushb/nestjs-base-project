import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  total: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  next: boolean;

  @ApiProperty()
  prev: boolean;
}
