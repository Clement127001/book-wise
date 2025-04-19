import { memo } from "react";

const BorrowRequest = memo(({ searchText }: { searchText: string }) => {
  return <div>BorrowRequest {searchText}</div>;
});

export default BorrowRequest;
