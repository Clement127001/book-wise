import { memo } from "react";

const AllBooks = memo(({ searchText }: { searchText: string }) => {
  return <div>all books {searchText}</div>;
});

AllBooks.displayName = "AllBooksComponent";
export default AllBooks;
