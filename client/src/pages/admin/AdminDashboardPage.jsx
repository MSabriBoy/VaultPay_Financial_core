import {
  Users,
  FileText,
  Wallet,
  Clock3,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";

import useDashboard from "../../hooks/useDashboard";

const AdminDashboardPage = () => {
  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  const {
  totalClients = 0,
  totalInvoices = 0,
  paidRevenue = 0,
  pendingPayments = 0,
} = dashboard ?? {};

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
        title="Failed to load dashboard"
        description={error}
      />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Admin Dashboard"
        description="Monitor invoices, clients and payments."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={totalClients}
          subtitle="Registered clients"
          icon={<Users size={24} />}
        />

        <StatCard
          title="Invoices"
          value={totalInvoices}
          subtitle="Invoices created"
          icon={<FileText size={24} />}
        />

        <StatCard
          title="Revenue"
          value={`$${paidRevenue}`}
          subtitle="Paid invoices"
          icon={<Wallet size={24} />}
        />

        <StatCard
          title="Pending"
          value={pendingPayments}
          subtitle="Pending payments"
          icon={<Clock3 size={24} />}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;