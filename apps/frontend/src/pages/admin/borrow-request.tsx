import BorrowRequest from "@/components/admin/borrow-request/BorrowRequest";
import WrapperWithSearch from "@/components/admin/WrapperWithSearch";
import AdminLayout from "@/components/layout/AdminLayout";

const BorrowRequestPage = () => {
  return (
    <AdminLayout>
      <WrapperWithSearch MainComponent={BorrowRequest} />
    </AdminLayout>
  );
};

export default BorrowRequestPage;
