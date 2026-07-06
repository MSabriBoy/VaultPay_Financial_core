import { Link } from "react-router-dom";

import formatCurrency from "../../utils/currency";
import formatDate from "../../utils/date";

import StatusBadge from "../common/StatusBadge";

const InvoiceTable = ({ invoices, detailBasePath }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Invoice
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Client
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Amount
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                Due Date
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {invoice.invoiceNumber}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {invoice.client.name}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {formatCurrency(
                    invoice.amount,
                    invoice.currency
                  )}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge
                    status={invoice.status}
                  />
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {formatDate(invoice.dueDate)}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
  to={`${detailBasePath}/${invoice._id}`}
  className="text-sm font-medium text-blue-600 hover:text-blue-700"
>
  View
</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;