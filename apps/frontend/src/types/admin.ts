import { MemoExoticComponent } from "react";

export type AdminLayoutProps = {
  MainComponent: MemoExoticComponent<
    ({ searchText }: { searchText: string }) => JSX.Element
  >;
};

export type AdminGlobalSearchText = {
  searchText: string;
};
