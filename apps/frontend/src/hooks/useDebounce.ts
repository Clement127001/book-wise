import { useEffect, useState } from "react";

const useDebounce = (searchText: string, delay: number) => {
  const [debouncedSearchText, setDebouncedSearchText] =
    useState<string>(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchText]);

  return debouncedSearchText;
};

export default useDebounce;
