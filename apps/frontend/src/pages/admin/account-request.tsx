import AccountRequest from "@/components/admin/account-request/AccountRequest";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";

const AccountRequestPage = () => {
  return (
    <AdminLayout>
      <WrapperWithSearch MainComponent={AccountRequest} />
    </AdminLayout>
  );
};

export default AccountRequestPage;
