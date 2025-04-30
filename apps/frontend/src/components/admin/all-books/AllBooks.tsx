import { memo } from "react";
import Link from "next/link";
import { ArrowUpDown, Plus } from "lucide-react";
import BooksTable from "@/components/admin/all-books/BooksTable";
import { Button } from "@/components/ui/button";
import AdminPrimaryButton from "@/components/admin/AdminPrimaryButton";
import { useQueryState } from "@/hooks/useQueryState";

const AllBooks = memo(({ searchText }: { searchText: string }) => {
  const [allBooksSearchQuery, setAllBookSearchQuery] = useQueryState<{
    currentPage: number;
    sortInAsc: boolean;
  }>("allBooksSearchQuery", { currentPage: 1, sortInAsc: false });

  const handlePageNumberChange = (page: number) => {
    setAllBookSearchQuery({ ...allBooksSearchQuery, currentPage: page });
  };

  const handleToggleSortOrder = () => {
    setAllBookSearchQuery({
      ...allBooksSearchQuery,
      sortInAsc: !allBooksSearchQuery.sortInAsc,
    });
  };

  return (
    <section className="bg-white p-4 mt-6 rounded-xl min-h-[85vh]">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-[20px]">All Books</h3>
        <div className="space-x-3 flex">
          <Button
            className="bg-transparent border-[1px] py-2 border-app-gray-200 hover:bg-gray-50"
            onClick={handleToggleSortOrder}
          >
            A-Z
            <ArrowUpDown />
          </Button>
          <Link href={"/admin/book/create"}>
            <AdminPrimaryButton type="button" className="h-[44px] rounded-md">
              <Plus />
              Create New Book
            </AdminPrimaryButton>
          </Link>
        </div>
      </div>

      <BooksTable
        searchText={searchText}
        allBooksSearchQuery={allBooksSearchQuery}
        handlePageNumberChange={handlePageNumberChange}
      />
    </section>
  );
});

AllBooks.displayName = "AllBooksComponent";
export default AllBooks;
