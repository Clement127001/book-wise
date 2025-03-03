import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { userContract } from 'contract/user/contract';
import { UserService } from '@/user/user.service';

const userController = nestControllerContract(userContract);

export type UserRequestShape = NestRequestShapes<typeof userController>;

@Controller()
export class UserController
  implements NestControllerInterface<typeof userContract>
{
  constructor(private readonly userService: UserService) {}

  @TsRest(userContract.createUser)
  async createUser(
    @TsRestRequest()
    { body }: UserRequestShape['createUser'],
  ) {
    const { token } = await this.userService.createUser(body);

    return {
      status: 201 as const,
      body: {
        success: true,
        message: 'User Created.',
        token,
      },
    };
  }
}
