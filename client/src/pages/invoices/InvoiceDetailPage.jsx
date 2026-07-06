import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import ClientLayout from "../../layouts/ClientLayout";

import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";
import StatusBadge from "../../components/common/StatusBadge";

import useInvoiceDetail from "../../hooks/useInvoiceDetail";
import useInvoicePayment from "../../hooks/useInvoicePayment";
import useAuth from "../../hooks/useAuth";

import { INVOICE_STATUS } from "../../constants/invoiceStatus";
import { ROLES } from "../../constants/roles";

import formatCurrency from "../../utils/currency";
import formatDate from "../../utils/date";

import { downloadReceipt } from "../../services/invoiceApi";

const InvoiceDetailPage = () => {
    const {
        invoice,
        loading,
        error,
    } = useInvoiceDetail();

    const {
        startPayment,
        loading: paymentLoading,
    } = useInvoicePayment();

    const { user } = useAuth();

    const Layout =
        user?.role === ROLES.ADMIN
            ? AdminLayout
            : ClientLayout;

    const handleReceiptDownload = async () => {
        try {
            const response = await downloadReceipt(
                invoice._id
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.download = `Receipt-${invoice.invoiceNumber}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error(
                error.response?.data?.message ??
                "Failed to download receipt."
            );
        }
    };

    if (loading) {
        return (
            <Layout>
                <Spinner />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <EmptyState
                    title="Failed to load invoice"
                    description={error}
                />
            </Layout>
        );
    }

    if (!invoice) {
        return (
            <Layout>
                <EmptyState
                    title="Invoice not found"
                    description="The requested invoice does not exist."
                />
            </Layout>
        );
    }

    return (
        <Layout>
            <PageHeader
                title={invoice.invoiceNumber}
                description="Invoice details"
            />

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-6 md:grid-cols-2">

                    <div>
                        <p className="text-sm text-slate-500">
                            Client
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-slate-900">
                            {invoice.client.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {invoice.client.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Issued By
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-slate-900">
                            {invoice.issuedBy.name}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Amount
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-slate-900">
                            {formatCurrency(
                                invoice.amount,
                                invoice.currency
                            )}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Status
                        </p>

                        <div className="mt-2">
                            <StatusBadge
                                status={invoice.status}
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Due Date
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-slate-900">
                            {formatDate(invoice.dueDate)}
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Paid At
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-slate-900">
                            {invoice.paidAt
                                ? formatDate(invoice.paidAt)
                                : "Not Paid"}
                        </h3>
                    </div>

                </div>

                <div className="mt-8">
                    <p className="text-sm text-slate-500">
                        Description
                    </p>

                    <p className="mt-2 leading-7 text-slate-700">
                        {invoice.description}
                    </p>
                </div>

                <div className="mt-8 flex gap-4">

                    {user?.role === ROLES.CLIENT &&
                        invoice.status === INVOICE_STATUS.PENDING && (
                            <button
                                type="button"
                                onClick={() => startPayment(invoice._id)}
                                disabled={paymentLoading}
                                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {paymentLoading
                                    ? "Redirecting..."
                                    : "Pay Now"}
                            </button>
                        )}
                    {invoice.status === INVOICE_STATUS.PAID && (
                        <button
                            type="button"
                            onClick={handleReceiptDownload}
                            className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                        >
                            Download Receipt
                        </button>
                    )}
                </div>

            </div>
        </Layout>
    );
};

export default InvoiceDetailPage;