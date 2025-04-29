import { z } from "zod";
import { MemoExoticComponent } from "react";
import { BaseBookSchema } from "contract/book/schema";

export type BookFormType = Omit<z.infer<typeof BaseBookSchema>, "genreId"> & {
  genreId: { value: string; label: string } | null;
};

export type AdminLayoutProps = {
  MainComponent: MemoExoticComponent<
    ({ searchText }: { searchText: string }) => JSX.Element
  >;
  className?: string;
};

export type AdminGlobalSearchText = {
  searchText: string;
};
