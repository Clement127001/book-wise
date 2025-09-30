import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  TsRest,
  NestRequestShapes,
} from '@ts-rest/nest';
import { Account } from './entities/account.entity';
import { Auth, getAccountFromToken } from './decorators/auth.decorator';
import { accountContract } from 'contract/account/contract';

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
        avatarUrl: avatarUrl ?? '',
      },
    };
  }
}
