import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PersonEntity, RoleEntity, UserEntity } from 'src/entities';
import {
  CreateUserPersonDTO,
  GetUserPersonDataDTO,
  PersonRepositoryInterface,
  ResponseUserDTO,
  RoleRepositoryInterface,
  UpdateUserDTO,
  UserRepositoryInterface,
} from 'src/interfaces';

@Injectable()
export class UserPersonService {
  constructor(
    @Inject('IPersonRepository')
    private readonly personRepository: PersonRepositoryInterface,
    @Inject('IUserRepository')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('IRoleRepository')
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  async getAllUser() {
    const data = await firstValueFrom(this.userRepository.findAll());
    return data;
  }

  async getUserById(id: string): Promise<GetUserPersonDataDTO> {
    const dataUser = await firstValueFrom(
      this.userRepository.findOne({
        where: {
          id: id,
        },
      }),
    );
    const dataPerson = await firstValueFrom(
      this.personRepository.findOne({
        where: {
          id: dataUser?.personId,
        },
      }),
    );
    const dataRole = await firstValueFrom(
      this.roleRepository.findOne({
        where: {
          id: dataUser?.roleId,
        },
      }),
    );
    const responseData = {
      user: {
        id: dataUser?.id,
        nickName: dataUser?.userNickname,
        role: dataRole?.roleName,
      },
      person: {
        id: dataPerson?.id,
        name: dataPerson?.personName,
        lastName: dataPerson?.personLastName,
        mail: dataPerson?.personMail,
        phone: dataPerson?.personPhone,
      },
    } as GetUserPersonDataDTO;
    return responseData;
  }

  async createNewUser(
    createNewUserDTO: CreateUserPersonDTO,
  ): Promise<ResponseUserDTO> {
    let dataPerson: PersonEntity;

    const ResponseData = (status: string, message: string) => {
      return {
        status: status,
        message: message,
      } as ResponseUserDTO;
    };

    const user = await firstValueFrom(
      this.userRepository.findOne({
        where: {
          userNickname: createNewUserDTO.user.userNickname,
        },
      }),
    );
    if (user) {
      return ResponseData(
        'Existing user',
        `The user ${user.userNickname} already exists`,
      );
    }
    const person = await firstValueFrom(
      this.personRepository.findOne({
        where: {
          personMail: createNewUserDTO.person.personMail,
        },
      }),
    );
    if (person) {
      const personInUser = await firstValueFrom(
        this.userRepository.findOne({
          where: {
            person: person,
          },
        }),
      );
      if (personInUser) {
        return ResponseData(
          'Invalid email',
          `the email ${person.personMail} is already registered as user`,
        );
      }
      dataPerson = person;
    } else {
      dataPerson = new PersonEntity();
      dataPerson.personName = createNewUserDTO.person.personName;
      dataPerson.personLastName = createNewUserDTO.person.personLastName;
      dataPerson.personMail = createNewUserDTO.person.personMail;
      dataPerson.personPhone = createNewUserDTO.person.personPhone;
      dataPerson = await firstValueFrom(
        this.personRepository.create(dataPerson),
      );
    }
    let dataUser = new UserEntity();
    dataUser.userNickname = createNewUserDTO.user.userNickname;
    dataUser.userPassword = createNewUserDTO.user.userPassword;
    dataUser.person = dataPerson;
    dataUser.role = (await firstValueFrom(
      this.roleRepository.findOne({
        where: {
          id: 'b786327a-a58e-4c5a-925e-fe2bc32d14bf',
        },
      }),
    )) as RoleEntity;
    dataUser = await firstValueFrom(this.userRepository.create(dataUser));

    return ResponseData(
      'Created',
      `The user ${dataUser.userNickname} has been created correctly!`,
    );
  }

  async editUser(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<ResponseUserDTO> {
    const dataUser = await this.userRepository.update(id, updateUserDTO);
    const responseData = {
      status: 'Edited',
      message: `The user ${dataUser.nickName} has been edited successfully!`,
    } as ResponseUserDTO;
    return responseData;
  }

  async deleteUser(id: string): Promise<any> {
    const dataUser = await this.userRepository.delete(id);
    const responseData = {
      id: id,
      status: 'Deleted',
      message: 'The user has been successfully deleted!',
      affected: dataUser.affected,
      raw: dataUser.raw,
    };
    return responseData;
  }
}
