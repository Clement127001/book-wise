export enum UserAccountStatus {
  PENDING = "Pending",
  DENIED = "Denied",
  VERIFIED = "Verified",
}

export enum UserRoleEnum {
  ADMIN = "Admin",
  USER = "User",
  SUPERADMIN = "Superadmin",
}

export enum BorrowRequestStatusEnum {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  BORROWED = "Borrowed",
  REJECTED = "Rejected",
  EXPIRED = "Expired",
}

export enum BorrowedBookStatusEnum {
  BORROWED = "Borrowed",
  RETURNED = "Returned",
  LATERETURN = "Late Return",
}
