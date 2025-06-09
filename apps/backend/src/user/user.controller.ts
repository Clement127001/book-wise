import { Controller } from '@nestjs/common';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { Account } from '@/auth/entities/account.entity';
import { userContract } from 'contract/user/contract';
import { UserService } from '@/user/user.service';
import {
  AdminOnlyAuth,
  getAccountFromToken,
  UserOnlyAuth,
} from '@/auth/decorators/auth.decorator';

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
        message: 'User Created Successfully!',
        token,
      },
    };
  }

  @UserOnlyAuth()
  @TsRest(userContract.getUserDetails)
  async getUserDetails(@getAccountFromToken() account: Account) {
    const userDetails = await this.userService.getUserDetails(account);

    return {
      status: 200 as const,

      body: {
        ...userDetails,
        success: true,
        message: 'User details retrieved successfully!',
      },
    };
  }

  @UserOnlyAuth()
  @TsRest(userContract.getBorrowedBooks)
  async getBorrowedBooks(
    @getAccountFromToken() account: Account,
    @TsRestRequest() { query }: UserRequestShape['getBorrowedBooks'],
  ) {
    const { borrowedBookCount, borrowedBooks } =
      await this.userService.getBorrowedBooks(account, query);

    const { pageNumber, pageSize } = query;

    return {
      status: 200 as const,
      body: {
        currentPageNumber: pageNumber,
        currentPageSize: pageSize,
        totalItems: borrowedBookCount,
        totalPages: Math.ceil(borrowedBookCount / pageSize),
        results: borrowedBooks,
      },
    };
  }

  @UserOnlyAuth()
  @TsRest(userContract.updateUserDetails)
  async updateUserDetails(
    @getAccountFromToken() account: Account,
    @TsRestRequest() { body }: UserRequestShape['updateUserDetails'],
  ) {
    await this.userService.updateUserDetails(account, body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'User details updated successfully!',
      },
    };
  }

  @AdminOnlyAuth()
  @TsRest(userContract.getAllUsers)
  async getAllUsers(
    @TsRestRequest() { query }: UserRequestShape['getAllUsers'],
  ) {
    const { allUsers, verifiedUserCount } =
      await this.userService.getAllUsers(query);
    const { pageNumber, pageSize } = query;

    return {
      status: 200 as const,
      body: {
        currentPageNumber: pageNumber,
        currentPageSize: pageSize,
        totalItems: verifiedUserCount,
        totalPages: Math.ceil(verifiedUserCount / pageSize),
        results: allUsers,
      },
    };
  }

  @AdminOnlyAuth()
  @TsRest(userContract.getAllAccountRequest)
  async getAllAccountRequest(
    @TsRestRequest()
    { query }: UserRequestShape['getAllAccountRequest'],
  ) {
    const { accountRequests, accountRequestsCount } =
      await this.userService.getAllAccountRequest(query);

    const { pageNumber, pageSize } = query;

    return {
      status: 200 as const,
      body: {
        currentPageNumber: pageNumber,
        currentPageSize: pageSize,
        totalItems: accountRequestsCount,
        totalPages: Math.ceil(accountRequestsCount / pageSize),
        results: accountRequests,
      },
    };
  }

  @AdminOnlyAuth()
  @TsRest(userContract.changeAccountStatus)
  async changeAccountStatus(
    @TsRestRequest() { body }: UserRequestShape['changeAccountStatus'],
  ) {
    await this.userService.changeAccountStatus(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'User account status is changed successfully!',
      },
    };
  }

  @AdminOnlyAuth()
  @TsRest(userContract.deleteUser)
  async deleteUser(@TsRestRequest() { body }: UserRequestShape['deleteUser']) {
    await this.userService.deleteUser(body);
    return {
      status: 200 as const,
      body: {
        success: true,
        message: 'User deleted successfully!',
      },
    };
  }
}
