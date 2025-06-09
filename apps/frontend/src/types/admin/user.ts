import { UserAccountStatus } from "contract/enum";

export type UserAccountListType = {
  sortInAsc: boolean;
  currentPage: number;
};

export type IdPreviewDataType = { idCardUrl: string; fullName: string };

export type ChangeStatusModalType = { id: string; status: UserAccountStatus };
