import { EntityManager, QueryOrder, wrap } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRequestShape } from '@/user/user.controller';
import { AuthService } from '@/auth/auth.service';
import { User } from '@/user/entities/user.entity';
import { EmailVerification } from '@/user-auth/entities/emailVerification.entity';
import { Account } from '@/auth/entities/account.entity';
import { UserAccountStatus, UserRoleEnum } from 'contract/enum';
import { BorrowedBook } from '@/book/entities/borrowedBook.entity';

@Injectable()
export class UserService {
  constructor(
    private em: EntityManager,
    private authService: AuthService,
  ) {}

  async createUser(data: UserRequestShape['createUser']['body']) {
    const {
      email,
      verficationId,
      firstname,
      lastname,
      identityCardUrl,
      avatarUrl,
    } = data;

    const user = await this.em.findOne(User, { user: { email } });

    if (user)
      throw new BadRequestException(
        'User with give email is already exists, try to login instead',
      );

    const isEmailVerified = await this.em.findOne(EmailVerification, {
      email,
      id: verficationId,
    });

    if (!isEmailVerified)
      throw new BadRequestException('Email is not verified.');

    const newUserAccount = new Account({
      firstname: firstname.trim(),
      lastname: lastname.trim(),
      email,
      avatarUrl: avatarUrl || null,
      role: UserRoleEnum.USER,
    });

    const newUser = new User({
      user: newUserAccount,
      identityCardUrl,
    });

    this.em.persistAndFlush([newUserAccount, newUser]);

    const token = await this.authService.generateJWTToken({
      id: newUserAccount.id,
      email,
    });

    return { token };
  }

  async getUserDetails(account: Account) {
    const { email, firstname, lastname, avatarUrl } = account;

    if (!account.user || (account.user && account.user.isDeleted === true)) {
      throw new BadRequestException('User not found');
    }

    const { id, identityCardUrl, createdAt, updatedAt, verificationStatus } =
      account.user;

    return {
      id,
      firstname,
      lastname,
      email,
      identityCardUrl,
      avatarUrl: avatarUrl ?? undefined,
      createdAt,
      updatedAt,
      verificationStatus,
    };
  }

  async getBorrowedBooks(
    account: Account,
    query: UserRequestShape['getBorrowedBooks']['query'],
  ) {
    if (!account.user || (account.user && account.user.isDeleted === true)) {
      throw new BadRequestException('User not found');
    }

    const { pageNumber, pageSize } = query;

    const [books, borrowedBookCount] = await this.em.findAndCount(
      BorrowedBook,
      { user: account.user },
      {
        limit: pageSize,
        populate: [
          'id',
          'book.imageUrl',
          'book.title',
          'book.genre.title',
          'createdAt',
          'status',
        ],
        offset: (pageNumber - 1) * pageSize,
      },
    );

    const borrowedBooks = books.map(({ id, book, createdAt, status }) => {
      const { imageUrl, title, genre } = book;
      return {
        id,
        imageUrl: imageUrl,
        title: title,
        genre: genre.title,
        borrowedDate: createdAt,
        status,
      };
    });

    return { borrowedBookCount, borrowedBooks };
  }

  async updateUserDetails(
    account: Account,
    data: UserRequestShape['updateUserDetails']['body'],
  ) {
    const user = await this.em.findOne(User, {
      user: account.user,
      isDeleted: false,
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { email, firstname, lastname, identityCardUrl, avatarUrl } = data;
    wrap(account).assign({ firstname, lastname, avatarUrl, email });
    wrap(user).assign({ identityCardUrl });
    await this.em.flush();
  }

  async getAllUsers(query: UserRequestShape['getAllUsers']['query']) {
    const { pageNumber, pageSize, searchText, sortByAlphabeticOrder } = query;

    const filterQuery = { isDeleted: false, account: { firstname: {} } };

    if (searchText) {
      filterQuery.account.firstname = { $ilike: searchText };
    }

    const [verifiedUsers, verifiedUserCount] = await this.em.findAndCount(
      User,
      {
        verificationStatus: UserAccountStatus.VERFIED,
        ...filterQuery,
      },
      {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
        populate: [
          'id',
          'borrowedBooks.id',
          'createdAt',
          'updatedAt',
          'identityCardUrl',
          'user.firstname',
          'user.lastname',
          'user.avatarUrl',
          'user.email',
        ],
        orderBy: {
          user: {
            firstname:
              sortByAlphabeticOrder === 'true'
                ? QueryOrder.asc
                : QueryOrder.desc,
          },
        },
      },
    );

    const allUsers = verifiedUsers.map((item) => {
      const { id, borrowedBooks, createdAt, updatedAt, identityCardUrl, user } =
        item;

      return {
        id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        identityCardUrl,
        avatarUrl: user.avatarUrl ?? undefined,
        createdAt,
        updatedAt,
        borrowedBooksCount: borrowedBooks.length,
      };
    });

    return { allUsers, verifiedUserCount };
  }

  async getAllAccountRequest(
    query: UserRequestShape['getAllAccountRequest']['query'],
  ) {
    const { pageNumber, pageSize, searchText, sortByCreatedTime } = query;

    const filterQuery = { isDeleted: false, account: { firstname: {} } };

    if (searchText) {
      filterQuery.account.firstname = { $ilike: searchText };
    }

    const [userAccountRequests, accountRequestsCount] =
      await this.em.findAndCount(
        User,
        {
          verificationStatus: UserAccountStatus.PENDING,
          ...filterQuery,
        },
        {
          limit: pageSize,
          offset: (pageNumber - 1) * pageSize,
          populate: [
            'id',
            'createdAt',
            'updatedAt',
            'identityCardUrl',
            'user.firstname',
            'user.lastname',
            'user.avatarUrl',
            'user.email',
          ],
          orderBy: {
            createdAt:
              sortByCreatedTime === 'true' ? QueryOrder.asc : QueryOrder.desc,
          },
        },
      );

    const accountRequests = userAccountRequests.map((item) => {
      const { id, borrowedBooks, createdAt, updatedAt, identityCardUrl, user } =
        item;

      return {
        id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        identityCardUrl,
        avatarUrl: user.avatarUrl ?? undefined,
        createdAt,
        updatedAt,
      };
    });

    return { accountRequests, accountRequestsCount };
  }

  async changeAccountStatus(
    data: UserRequestShape['changeAccountStatus']['body'],
  ) {
    const { id, status } = data;
    const user = await this.em.findOne(User, { id });

    if (!user) {
      throw new BadRequestException('User with given id not found');
    }
    wrap(user).assign({ verificationStatus: status });
    await this.em.flush();
  }
}
