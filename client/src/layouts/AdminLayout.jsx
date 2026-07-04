import DashboardLayout from "./DashboardLayout";

const AdminLayout = ({ children }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

export default AdminLayout;