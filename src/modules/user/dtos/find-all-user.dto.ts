import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { User } from '../entity/user.entity';
import { Meta } from '@/interfaces/meta.interface';
import { FindAllResponse } from '@/interfaces/find-all-response.interface';
import { PaginationParams } from '@/common/decorators/pagination/pagination.decorator';
import { USER_SELECT, UserSelect } from '../enums/user-select.enum';
import { Transform } from 'class-transformer';
import { SelectSanatizer } from '@/common/select/select-sanitizer.transformer';

export class UserFilterParams extends PaginationParams {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    enum: USER_SELECT,
    enumName: 'UserSelect',
    isArray: true,
  })
  @IsOptional()
  @IsEnum(USER_SELECT, { each: true })
  @Transform(SelectSanatizer)
  select?: UserSelect[];
}

export class FindAllUserResponse implements FindAllResponse<User> {
  @ApiProperty({ type: [User] })
  data: User[];

  @ApiProperty()
  meta: Meta;
}
