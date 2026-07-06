import {
  Users,
  FileText,
  Wallet,
  Clock3,
  Plus,
} from "lucide-react";

import { Link } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";

import useDashboard from "../../hooks/useDashboard";

import formatCurrency from "../../utils/currency";

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
        actions={
          <div className="flex gap-3">

            <Link
              to="/admin/invoices"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              View All Invoices
            </Link>

            <Link
              to="/admin/invoices/create"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />

              Create Invoice
            </Link>

          </div>
        }
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
          to="/admin/invoices"
        />

        <StatCard
          title="Revenue"
          value={formatCurrency(paidRevenue)}
          subtitle="Total Paid Revenue"
          icon={<Wallet size={24} />}
          to="/admin/invoices?status=paid"
        />

        <StatCard
          title="Pending"
          value={pendingPayments}
          subtitle="Pending payments"
          icon={<Clock3 size={24} />}
          to="/admin/invoices?status=pending"
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;