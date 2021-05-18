import { UserDto } from "../controller/dtos/UserDto";
import { Builder } from "builder-pattern";
import { UserInterface } from "../domain/interfaces/User.interface";
import {UserRepository} from "../domain/repository/UserRepository";
import {User} from "../domain/entity/User";
import {Response} from "express";
import {Res} from "routing-controllers";

export class UserService {

  private userRepository: UserRepository;
  constructor(
    private readonly usersDto: UserDto,
    private readonly usersRepository: UserRepository
  ) {
    this.userRepository = usersRepository;
  }

  async membershipRegister(userDto: UserDto): Promise<UserDto> {
    // hash -> encryption
    // salt

    const user = new User(
      userDto.getUserId,
      userDto.getUserName,
      userDto.getUserPassword,
      userDto.getUserPhone,
      userDto.getUserEmail,
      userDto.getUserAddress
    );

    await this.userRepository.save(user);

    return new UserDto(
      user.getUserId,
      user.getUserName,
      user.getUserPassword,
      user.getUserPhone,
      user.getUserEmail,
      user.getUserAddress
    );

  }

}