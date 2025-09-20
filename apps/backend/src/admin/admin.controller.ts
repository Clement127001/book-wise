import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { adminContract } from 'contract/admin/contract';
import { AdminService } from './admin.service';

const adminAuthController = nestControllerContract(adminContract);
export type AdminRequestShape = NestRequestShapes<typeof adminAuthController>;

@Controller()
export class AdminController
  implements NestControllerInterface<typeof adminContract>
{
  constructor(private readonly adminService: AdminService) {}

  @TsRest(adminContract.createAdmin)
  async createAdmin(
    @TsRestRequest()
    { body }: AdminRequestShape['createAdmin'],
  ) {
    const { token } = await this.adminService.createAdmin(body);

    return {
      status: 201 as const,
      body: {
        success: true,
        message: 'User Created Successfully!',
        token,
      },
    };
  }

  @TsRest(adminContract.verifyAdmin)
  async verifyAdmin(
    @TsRestRequest()
    { body }: AdminRequestShape['verifyAdmin'],
  ) {
    await this.adminService.verifyAdmin(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Admin verified successfully',
      },
    };
  }
}
