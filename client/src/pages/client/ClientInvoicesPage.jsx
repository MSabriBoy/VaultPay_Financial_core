import { useSearchParams } from "react-router-dom";

import ClientLayout from "../../layouts/ClientLayout";

import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import InvoiceTable from "../../components/tables/InvoiceTable";

import useInvoices from "../../hooks/useInvoices";

const ClientInvoicesPage = () => {

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
            <ClientLayout>
                <Spinner />
            </ClientLayout>
        );
    }

    if (error) {
        return (
            <ClientLayout>
                <EmptyState
                    title="Failed to load invoices"
                    description={error}
                />
            </ClientLayout>
        );
    }

    if (filteredInvoices.length === 0) {
        return (
            <ClientLayout>
                <EmptyState
                    title="No invoices found"
                    description={
                        status
                            ? `No ${status} invoices found.`
                            : "Your invoices will appear here."
                    }
                />
            </ClientLayout>
        );
    }

    return (
        <ClientLayout>
            <PageHeader
                title={
                    status
                        ? `My ${status.charAt(0).toUpperCase()}${status.slice(1)} Invoices`
                        : "My Invoices"
                }
                description={
                    status
                        ? `Showing your ${status} invoices.`
                        : "View and manage your invoices."
                }
            />

            <InvoiceTable
                invoices={filteredInvoices}
                detailBasePath="/client/invoices"
            />
        </ClientLayout>
    );
};

export default ClientInvoicesPage;