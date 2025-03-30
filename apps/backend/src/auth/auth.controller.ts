import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  TsRest,
} from '@ts-rest/nest';
import { accountContract } from 'contract/account/contract';
import { NestRequestShapes } from '@ts-rest/nest';
import { Auth, getAccountFromToken } from './decorators/auth.decorator';
import { Account } from './entities/account.entity';

const authController = nestControllerContract(accountContract);

export type authControllerShape = NestRequestShapes<typeof authController>;

@Controller()
export class AuthController
  implements NestControllerInterface<typeof accountContract>
{
  constructor() {}

  @Auth()
  @TsRest(accountContract.getAccountDetail)
  async getAccountDetail(@getAccountFromToken() account: Account) {
    const { firstname, lastname, email, id, role, avatarUrl } = account;
    return {
      status: 200 as const,
      body: {
        firstname,
        lastname,
        id,
        email,
        role,
        avatarUrl,
      },
    };
  }
}
