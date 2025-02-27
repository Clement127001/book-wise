import { Controller } from '@nestjs/common';
import { UserAuthService } from '@/user-auth/user-auth.service';

import { userAuthContract } from 'contract/auth/userAuth/contract';

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
  constructor(private readonly userAuthServide: UserAuthService) {}

  @TsRest(userAuthContract.generateUserEmailVerficationOTP)
  async generateUserEmailVerficationOTP() {
    // { body }: UserAuthRequestShape['generateUserEmailVerficationOTP'], // @TsRestRequest(userAuthController.generateUserEmailVerficationOTP)
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Login link sent via email.',
      },
    };
  }
}
