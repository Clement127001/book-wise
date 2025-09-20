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
    await this.userAuthService.generateUserEmailVerficationOTP(body);

    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Register OTP sent via email.',
      },
    };
  }

  @TsRest(userAuthContract.verfiyUserEmailVerificationOTP)
  async verfiyUserEmailVerificationOTP(
    @TsRestRequest()
    { body }: UserAuthRequestShape['verfiyUserEmailVerificationOTP'],
  ) {
    const { verificationId } =
      await this.userAuthService.verfiyUserEmailVerificationOTP(body);

    return {
      status: 201 as const,
      body: {
        success: true,
        message: 'OTP verified',
        verificationId,
      },
    };
  }

  @TsRest(userAuthContract.generateUserLoginOTP)
  async generateUserLoginOTP(
    @TsRestRequest()
    { body }: UserAuthRequestShape['generateUserLoginOTP'],
  ) {
    await this.userAuthService.generateUserLoginOTP(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Login OTP sent via email.',
      },
    };
  }

  @TsRest(userAuthContract.verifyUserLoginOTP)
  async verifyUserLoginOTP(
    @TsRestRequest()
    { body }: UserAuthRequestShape['verifyUserLoginOTP'],
  ) {
    const { token } = await this.userAuthService.verifyUserLoginOTP(body);

    return {
      status: 201 as const,
      body: {
        success: true,
        message: 'OTP verified.',
        token,
      },
    };
  }
}
