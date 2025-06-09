import { MemoExoticComponent } from "react";

export type AdminLayoutProps = {
  MainComponent: MemoExoticComponent<
    ({ searchText }: { searchText: string }) => JSX.Element
  >;
  className?: string;
};

export type AdminGlobalSearchText = {
  searchText: string;
};
