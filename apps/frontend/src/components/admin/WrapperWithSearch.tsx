import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useQueryState } from "@/hooks/useQueryState";
import { useUserData } from "@/context/UserDataProvider";
import { getFullName } from "@/utils/common";
import { AdminGlobalSearchText, AdminLayoutProps } from "@/types/admin";

const WrapperWithSearch = ({ MainComponent }: AdminLayoutProps) => {
  const { userData } = useUserData();

  const [searchText, setSearchText] = useQueryState<AdminGlobalSearchText>(
    "searchText",
    {
      searchText: "",
    }
  );

  const debouncedSearchText = useDebounce(searchText.searchText, 300);
  const { firstname, lastname } = userData;
  const fullName = getFullName(firstname, lastname);

  return (
    <div className="rounded-l-[14px] shadow-md p-6 border-[1.5px] border-app-gray-100  col-span-9 h-full">
      <div className="w-full flex justify-between">
        <div>
          <h1 className="text-app-black-300 font-semibold text-xl leading-5">
            Welcome, {fullName}
          </h1>
          <p className="text-sm text-app-gray-300 leading-loose">
            Monitor all of your projects and tasks here
          </p>
        </div>

        <Input
          placeholder="Search users, books by title, author, or genre."
          className=" max-w-[50%] min-h-[48px] bg-gray-50 placeholder:text-[14px] placeholder:font-normal border-app-gray-200 shadow-freelancer rounded-lg text-[16px]  focus:ring-0 focus:border-app-gray-300 focus:bg-gray-50 pl-3 md:pl-4"
          onChange={(e) => {
            setSearchText({
              searchText: e.target.value,
            });
          }}
          value={searchText.searchText}
        />
      </div>
      <MainComponent searchText={debouncedSearchText} />
    </div>
  );
};

export default WrapperWithSearch;
