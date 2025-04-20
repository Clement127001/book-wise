import { memo } from "react";

const AllUsers = memo(({ searchText }: { searchText: string }) => {
  return <div>all user {searchText}</div>;
});

AllUsers.displayName = "AllUsersComponent";
export default AllUsers;
