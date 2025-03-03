import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { AdminAuthService } from '@/admin-auth/admin-auth.service';
import { adminAuthContract } from 'contract/adminAuth/contract';

const adminAuthController = nestControllerContract(adminAuthContract);

export type AdminAuthRequestShape = NestRequestShapes<
  typeof adminAuthController
>;

@Controller()
export class AdminAuthController
  implements NestControllerInterface<typeof adminAuthContract>
{
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @TsRest(adminAuthContract.generateAdminLoginOTP)
  async generateAdminLoginOTP(
    @TsRestRequest()
    { body }: AdminAuthRequestShape['generateAdminLoginOTP'],
  ) {
    await this.adminAuthService.generateAdminLoginOTP(body);

    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Login otp sent via email.',
      },
    };
  }

  @TsRest(adminAuthContract.verifyAdminLoginOTP)
  async verifyAdminLoginOTP(
    @TsRestRequest()
    { body }: AdminAuthRequestShape['verifyAdminLoginOTP'],
  ) {
    const { token } = await this.adminAuthService.verifyAdminLoginOTP(body);

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
