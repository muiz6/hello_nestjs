import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
