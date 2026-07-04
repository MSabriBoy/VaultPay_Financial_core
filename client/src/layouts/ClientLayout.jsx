import DashboardLayout from "./DashboardLayout";

const ClientLayout = ({ children }) => {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

export default ClientLayout;