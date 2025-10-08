import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { SuperadminService } from './superadmin.service';
import { superadminContract } from 'contract/superadmin/contract';

const superadminController = nestControllerContract(superadminContract);
export type SuperadminRequestShape = NestRequestShapes<
  typeof superadminController
>;

@Controller()
export class SuperadminController
  implements NestControllerInterface<typeof superadminContract>
{
  constructor(private readonly superadminService: SuperadminService) {}

  @TsRest(superadminContract.generateSuperadminLoginOTP)
  async generateSuperadminLoginOTP(
    @TsRestRequest()
    { body }: SuperadminRequestShape['generateSuperadminLoginOTP'],
  ) {
    await this.superadminService.generateSuperadminLoginOTP(body);

    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Login OTP sent via email.',
      },
    };
  }

  @TsRest(superadminContract.verifySuperadminLoginOTP)
  async verifySuperadminLoginOTP(
    @TsRestRequest()
    { body }: SuperadminRequestShape['verifySuperadminLoginOTP'],
  ) {
    await this.superadminService.verifySuperadminLoginOTP(body);

    return {
      status: 201 as const,
      body: {
        success: true,
        message: 'OTP verified.',
        token: 'some-dummy-token',
      },
    };
  }

  @TsRest(superadminContract.listAdmin)
  async listAdmin(
    @TsRestRequest() { query }: SuperadminRequestShape['listAdmin'],
  ) {
    await this.superadminService.listAdmin(query);

    return {
      status: 200 as const,
      body: {
        currentPageNumber: 1,
        currentPageSize: 10,
        totalItems: 20,
        totalPages: Math.ceil(20 / 10),
        results: [],
      },
    };
  }

  @TsRest(superadminContract.verifyAdmin)
  async verifyAdmin(
    @TsRestRequest() { body }: SuperadminRequestShape['verifyAdmin'],
  ) {
    await this.superadminService.verifyAdmin(body);

    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'Admin status is changed successfully!',
      },
    };
  }
}
