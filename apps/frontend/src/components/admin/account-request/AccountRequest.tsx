import { memo } from "react";

const AccountRequest = memo(({ searchText }: { searchText: string }) => {
  return <div>AccountRequest {searchText}</div>;
});

AccountRequest.displayName = "AccountRequestComponent";
export default AccountRequest;
