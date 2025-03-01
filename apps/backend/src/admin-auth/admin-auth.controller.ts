import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';

import { adminAuthContract } from 'contract/adminAuth/contract';
import { AdminAuthService } from '@/admin-auth/admin-auth.service';

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
    await this.adminAuthService.getHello();

    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Login link sent via email.',
      },
    };
  }
}
