import PageLoader from "@/components/common/PageLoader";
import { createContext, ReactNode, useState, useContext } from "react";

interface PageLoaderContextInterface {
  isPageLoaderVisible: boolean;
  hidePageLoader: () => void;
  showPageLoader: () => void;
}

const PageLoaderContext = createContext<PageLoaderContextInterface>({
  isPageLoaderVisible: false,
  hidePageLoader: () => {},
  showPageLoader: () => {},
});

export const PageLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isPageLoaderVisible, setIsPageLoaderVisible] =
    useState<boolean>(false);

  const hidePageLoader = () => {
    setIsPageLoaderVisible(false);
  };

  const showPageLoader = () => {
    setIsPageLoaderVisible(true);
  };

  return (
    <PageLoaderContext.Provider
      value={{ isPageLoaderVisible, hidePageLoader, showPageLoader }}
    >
      <PageLoader isPageLoaderVisible={isPageLoaderVisible} />
      {children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => useContext(PageLoaderContext);
