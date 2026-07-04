import {
  FileText,
  Wallet,
  Clock3,
} from "lucide-react";

import ClientLayout from "../../layouts/ClientLayout";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";

const ClientDashboardPage = () => {
  return (
    <ClientLayout>
      <PageHeader
        title="Client Dashboard"
        description="Manage your invoices and payments."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Invoices"
          value="0"
          subtitle="Your invoices"
          icon={<FileText size={24} />}
        />

        <StatCard
          title="Paid"
          value="$0"
          subtitle="Completed payments"
          icon={<Wallet size={24} />}
        />

        <StatCard
          title="Pending"
          value="0"
          subtitle="Pending invoices"
          icon={<Clock3 size={24} />}
        />
      </div>
    </ClientLayout>
  );
};

export default ClientDashboardPage;