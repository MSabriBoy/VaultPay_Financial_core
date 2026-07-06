import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import ClientDashboardPage from "../pages/client/ClientDashboardPage";
import UnauthorizedPage from "../pages/system/UnauthorizedPage";
import AdminClientsPage from "../pages/admin/AdminClientsPage";
import CreateInvoicePage from "../pages/admin/CreateInvoicePage";
import InvoicePage from "../pages/admin/InvoicePage";
import InvoiceDetailPage from "../pages/invoices/InvoiceDetailPage";
import PaymentSuccessPage from "../pages/invoices/PaymentSuccessPage";
import ClientInvoicesPage from "../pages/client/ClientInvoicesPage";

import ProtectedRoute from "../routes/ProtectedRoute";
import AdminRoute from "../routes/AdminRoute";
import ClientRoute from "../routes/ClientRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/clients"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <AdminClientsPage />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/invoices/create"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <CreateInvoicePage />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/invoices"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <InvoicePage />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/invoices/:invoiceId"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <InvoiceDetailPage />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/client/invoices/:invoiceId"
  element={
    <ProtectedRoute>
      <ClientRoute>
        <InvoiceDetailPage />
      </ClientRoute>
    </ProtectedRoute>
  }
/>

<Route
  path="/payment/success"
  element={
    <ProtectedRoute>
      <PaymentSuccessPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/client"
          element={
            <ProtectedRoute>
              <ClientRoute>
                <ClientDashboardPage />
              </ClientRoute>
            </ProtectedRoute>
          }
        />

        <Route
  path="/client/invoices"
  element={
    <ProtectedRoute>
      <ClientRoute>
        <ClientInvoicesPage />
      </ClientRoute>
    </ProtectedRoute>
  }
/>

        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;