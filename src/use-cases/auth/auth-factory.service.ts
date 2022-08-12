import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@dto/create-user.dto';
import { User }  from '@entity';

@Injectable()
export class AuthFactoryService {
	registerNewUser(createUserDto: CreateUserDto) {
		const user = new User();
		user.name = createUserDto.name;
		user.raza = createUserDto.raza;
		user.role = "USER";
		user.sexo = createUserDto.sexo;
		user.email = createUserDto.email;
		user.birthday = createUserDto.email;
		user.nickname = createUserDto.nickname;
		user.password = createUserDto.password;
		user.biography = createUserDto.biography;
		user.phoneNumber = createUserDto.phoneNumber;
		user.avatar = null;
		user.banner = null;

		return user;
	}
}
