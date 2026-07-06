import formatDate from "../../utils/date";

const ClientTable = ({ clients }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Client
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Joined
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {clients.map((client) => (
              <tr
                key={client._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {client.name}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {client.email}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {formatDate(client.createdAt)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                   <button
  type="button"
  disabled
  className="cursor-not-allowed text-sm font-medium text-slate-400"
>
  View
</button>

<button
  type="button"
  disabled
  className="cursor-not-allowed text-sm font-medium text-slate-400"
>
  Create Invoice
</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;