import { memo } from "react";

const BorrowRequest = memo(({ searchText }: { searchText: string }) => {
  return <div>BorrowRequest {searchText}</div>;
});

BorrowRequest.displayName = "BorrowRequestComponent";
export default BorrowRequest;
