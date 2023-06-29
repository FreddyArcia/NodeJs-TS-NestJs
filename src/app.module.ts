import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  AppService,
  TypeOrmConfigService,
  UserPersonService,
} from './services';
import { PersonEntity, RoleEntity, UserEntity } from './entities';
import { UserCrudController } from './controllers';
import { PersonRepository } from './repository';
import { Configuration } from './config';
import { UserRepository } from './repository/user.repository';
import { RoleRepository } from './repository/role.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([PersonEntity, UserEntity, RoleEntity]),
  ],
  controllers: [UserCrudController],
  providers: [
    AppService,
    {
      provide: 'IPersonRepository',
      useClass: PersonRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepository,
    },
    UserPersonService,
  ],
})
export class AppModule {}
