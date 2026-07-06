import { INVOICE_STATUS } from "../../constants/invoiceStatus";

const statusStyles = {
  [INVOICE_STATUS.PAID]:
    "bg-green-100 text-green-700",

  [INVOICE_STATUS.PENDING]:
    "bg-yellow-100 text-yellow-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;