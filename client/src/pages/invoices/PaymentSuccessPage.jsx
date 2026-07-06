import { CircleCheckBig } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

const PaymentSuccessPage = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto mt-16 max-w-xl rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <CircleCheckBig
          size={72}
          className="mx-auto text-green-600"
        />

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Payment Successful
        </h1>

        <p className="mt-3 text-slate-600">
          Your payment has been processed successfully.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/client"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentSuccessPage;