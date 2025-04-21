import { z } from "zod";
import { BaseBookSchema } from "contract/book/schema";

export type BookFormType = z.infer<typeof BaseBookSchema>;

import { MemoExoticComponent } from "react";

export type AdminLayoutProps = {
  MainComponent: MemoExoticComponent<
    ({ searchText }: { searchText: string }) => JSX.Element
  >;
};

export type AdminGlobalSearchText = {
  searchText: string;
};
