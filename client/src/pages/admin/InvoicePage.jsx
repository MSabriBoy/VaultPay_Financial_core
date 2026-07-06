import { useSearchParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";

import InvoiceTable from "../../components/tables/InvoiceTable";

import useInvoices from "../../hooks/useInvoices";

const InvoicePage = () => {

  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");

  const {
    invoices,
    loading,
    error,
  } = useInvoices();

  const filteredInvoices = status
    ? invoices.filter(
      (invoice) =>
        invoice.status.toLowerCase() === status
    )
    : invoices;

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
          title="Failed to load invoices"
          description={error}
        />
      </AdminLayout>
    );
  }

  if (filteredInvoices.length === 0) {
    return (
      <AdminLayout>
        <EmptyState
          title="No invoices found"
          description={
            status
              ? `No ${status} invoices found.`
              : "Invoices will appear here after they are created."
          }
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title={
          status
            ? `${status.charAt(0).toUpperCase()}${status.slice(1)} Invoices`
            : "Invoices"
        }
        description={
          status
            ? `Showing ${status} invoices.`
            : "Manage all invoices."
        }
      />

      <InvoiceTable
        invoices={filteredInvoices}
        detailBasePath="/admin/invoices"
      />
    </AdminLayout>
  );
};

export default InvoicePage;