import Pagination from "@/components/common/Pagination";
import { memo } from "react";

const AllBooks = memo(({ searchText }: { searchText: string }) => {
  const currentPage = 1;
  const totalPages = 10;

  const handlePageNumberChange = (page: number) => {
    console.log(page);
  };

  return (
    <div>
      all books {searchText}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleChangePageNumber={handlePageNumberChange}
      />
    </div>
  );
});

AllBooks.displayName = "AllBooksComponent";
export default AllBooks;
