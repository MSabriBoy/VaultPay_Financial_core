import {
  FileText,
  Wallet,
  Clock3,
} from "lucide-react";

import ClientLayout from "../../layouts/ClientLayout";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";

import useDashboard from "../../hooks/useDashboard";
import formatCurrency from "../../utils/currency";
const ClientDashboardPage = () => {

  const {
  dashboard,
  loading,
  error,
} = useDashboard();

const {
  totalInvoices = 0,
  paidInvoices = 0,
  pendingInvoices = 0,
  paidAmount = 0,
} = dashboard ?? {};

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
        title="Failed to load dashboard"
        description={error}
      />
    </ClientLayout>
  );
}

  return (
    <ClientLayout>
      <PageHeader
        title="Client Dashboard"
        description="Manage your invoices and payments."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Invoices"
          value={totalInvoices}
          subtitle="Your invoices"
          icon={<FileText size={24} />}
          to="/client/invoices"
        />

        <StatCard
          title="Paid"
          value={formatCurrency(paidAmount)}
          subtitle={`${paidInvoices} paid invoice${paidInvoices !== 1 ? "s" : ""}`}
          icon={<Wallet size={24} />}
          to="/client/invoices?status=paid"
        />

        <StatCard
          title="Pending"
          value={pendingInvoices}
          subtitle="Pending invoices"
          icon={<Clock3 size={24} />}
          to="/client/invoices?status=pending"
        />
      </div>
    </ClientLayout>
  );
};

export default ClientDashboardPage;