import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import {
  CreateUserPersonDTO,
  GetUserPersonDataDTO,
  ResponseUserDTO,
  UpdateUserDTO,
} from 'src/interfaces';
import { UserPersonService } from 'src/services';

@Controller('crud-user')
export class UserCrudController {
  constructor(private readonly userRepository: UserPersonService) {}

  @Get()
  findAll() {
    return from(this.userRepository.getAllUser());
  }

  @Get(':uuid')
  findOne(
    @Param('uuid') uuid: string,
  ): Observable<GetUserPersonDataDTO | null> {
    return from(this.userRepository.getUserById(uuid));
  }

  @Post()
  create(@Body() newUser: CreateUserPersonDTO): Observable<ResponseUserDTO> {
    return from(this.userRepository.createNewUser(newUser));
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updatedUser: UpdateUserDTO,
  ): Observable<ResponseUserDTO> {
    return from(this.userRepository.editUser(uuid, updatedUser));
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string): Observable<any> {
    return from(this.userRepository.deleteUser(uuid));
  }
}
