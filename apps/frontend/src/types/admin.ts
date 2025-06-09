import { MemoExoticComponent } from "react";
import { z } from "zod";
import { BaseBookSchema, BookDetailsSchema } from "contract/book/schema";
import { UserAccountStatus } from "contract/enum";

export type BookFormType = Omit<z.infer<typeof BaseBookSchema>, "genreId"> & {
  genreId: { value: string; label: string } | null;
};

export type BookDetailsType = z.infer<typeof BookDetailsSchema>;

export type AdminLayoutProps = {
  MainComponent: MemoExoticComponent<
    ({ searchText }: { searchText: string }) => JSX.Element
  >;
  className?: string;
};

export type AdminGlobalSearchText = {
  searchText: string;
};

export type AccountRequestQuery = {
  sortInAsc: boolean;
  currentPage: number;
};

export type IdPreviewDataType = { idCardUrl: string; fullName: string };

export type ChangeStatusModalType = { id: string; status: UserAccountStatus };
