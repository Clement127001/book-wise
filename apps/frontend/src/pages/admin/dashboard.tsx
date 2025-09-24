import AdminLayout from "@/components/layout/AdminLayout";
import Wrapper from "@/components/admin/Wrapper";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import Head from "next/head";

const dashboard = () => {
  return (
    <>
      <Head>
        <title>Bookwise | Admin - Dashboard</title>
        <meta
          name="description"
          content="Get to know all the things that are happening within in the platform. View all the metrics about books, accounts and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AdminLayout>
        <Wrapper>
          <Dashboard />
        </Wrapper>
      </AdminLayout>
    </>
  );
};

export default dashboard;
