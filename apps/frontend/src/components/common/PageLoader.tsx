import React from "react";

interface PageLoaderProps {
  isPageLoaderVisible: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isPageLoaderVisible }) => {
  if (!isPageLoaderVisible) return null;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg dark:bg-app-primary-800 space-y-3">
        <div className="w-10 h-10 border-4 border-app-admin-primary-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="">Loading...</p>
      </div>
    </section>
  );
};

export default PageLoader;
