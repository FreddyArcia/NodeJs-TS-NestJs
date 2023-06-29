import { NewPersonDTO } from './person.interface';

export class GetUserDTO {
  id: string;
}

export class NewUserDTO {
  userNickname: string;
  userPassword: string;
}

export class UpdateUserDTO {
  userNickname: string;
  userPassword: string;
}

export class GetUserPersonDataDTO {
  user: {
    id: string;
    nickName: string;
    role: string;
  };
  person: {
    id: string;
    name: string;
    lastName: string;
    mail: string;
    phone: string;
  };
}

export class CreateUserPersonDTO {
  user: NewUserDTO;
  person: NewPersonDTO;
}

export class ResponseUserDTO {
  status: string;
  message: string;
}
