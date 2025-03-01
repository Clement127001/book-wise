import { Controller } from '@nestjs/common';
import { UserAuthService } from '@/user-auth/user-auth.service';

import { userAuthContract } from 'contract/userAuth/contract';

import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';

const userAuthController = nestControllerContract(userAuthContract);

export type UserAuthRequestShape = NestRequestShapes<typeof userAuthController>;

@Controller()
export class UserAuthController
  implements NestControllerInterface<typeof userAuthController>
{
  constructor(private readonly userAuthService: UserAuthService) {}

  @TsRest(userAuthContract.generateUserEmailVerficationOTP)
  async generateUserEmailVerficationOTP(
    @TsRestRequest()
    { body }: UserAuthRequestShape['generateUserEmailVerficationOTP'],
  ) {
    await this.userAuthService.getHello();

    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Login link sent via email.',
      },
    };
  }
}
