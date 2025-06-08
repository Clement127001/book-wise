import { z } from "zod";
import { MemoExoticComponent } from "react";
import { BaseBookSchema, BookDetailsSchema } from "contract/book/schema";

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
