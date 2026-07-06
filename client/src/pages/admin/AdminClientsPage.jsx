import AdminLayout from "../../layouts/AdminLayout";

import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";

import ClientTable from "../../components/tables/ClientTable";

import useClients from "../../hooks/useClients";

const AdminClientsPage = () => {
  const {
    clients,
    loading,
    error,
  } = useClients();

  if (loading) {
    return (
      <AdminLayout>
        <Spinner />
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <EmptyState
          title="Failed to load clients"
          description={error}
        />
      </AdminLayout>
    );
  }

  if (clients.length === 0) {
    return (
      <AdminLayout>
        <EmptyState
          title="No clients found"
          description="Clients will appear here after registration."
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Clients"
description="View registered clients and create invoices."
      />

      <ClientTable clients={clients} />
    </AdminLayout>
  );
};

export default AdminClientsPage;