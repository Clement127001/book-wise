import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pagination = ({
  currentPage,
  totalPages,
  handleChangePageNumber,
}: {
  currentPage: number;
  totalPages: number;
  handleChangePageNumber: (val: number) => void;
}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      handleChangePageNumber(page);
    }
  };

  const getPagesToRender = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => `${i + 1}`);
    }

    const pages: string[] = [];

    pages.push("1");

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(`${i}`);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(`${totalPages}`);

    return pages;
  };

  const pages = getPagesToRender();

  return (
    <div className={"w-full flex justify-center items-center py-4"}>
      <div className="flex gap-3 items-center text-center">
        <Button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-app-gray-100 hover:bg-gray-300"
        >
          <ArrowLeft /> Prev
        </Button>

        {pages.map((page: string, index: number) => {
          const pageInNumber = Number(page);

          const isActive = currentPage === pageInNumber;

          return !isNaN(pageInNumber) ? (
            <button
              key={index}
              onClick={() => goToPage(pageInNumber)}
              className={`w-10 h-10 rounded-md ${
                isActive
                  ? "bg-app-admin-primary-700 text-white"
                  : "bg-app-gray-100 hover:bg-app-gray-300/50 text-black"
              }`}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className={"bg-app-gray-100 text-black w-10 h-10 rounded-md"}
            >
              ...
            </span>
          );
        })}

        <Button
          onClick={() => goToPage(currentPage + 1)}
          disabled={totalPages === 0 || currentPage === totalPages}
          className="bg-app-gray-100 hover:bg-gray-300"
        >
          Next <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
