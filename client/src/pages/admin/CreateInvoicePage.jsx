import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import PageHeader from "../../components/common/PageHeader";
import Spinner from "../../components/common/Spinner";
import EmptyState from "../../components/common/EmptyState";

import useClients from "../../hooks/useClients";

import invoiceSchema from "../../utils/invoiceSchema";

import { createInvoice } from "../../services/invoiceApi";

const CreateInvoicePage = () => {
  const {
    clients,
    loading,
    error,
  } = useClients();

const {
  register,
  control,
  handleSubmit,
  formState: {
    errors,
    isSubmitting,
  },
} = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientId: "",
      amount: "",
      description: "",
      dueDate: "",
    },
  });

  const navigate = useNavigate();

 const onSubmit = async (data) => {
  try {
    await createInvoice(data);

    toast.success("Invoice created successfully.");

    navigate("/admin");
  } catch (error) {
    toast.error(
      error.response?.data?.message ??
        "Failed to create invoice."
    );
  }
};

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
          title="Failed to load clients"
          description={error}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Create Invoice"
        description="Create a new invoice for a client."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {/* Client */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Client
          </label>

          <Controller
            name="clientId"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">
                  Select Client
                </option>

                {clients.map((client) => (
                  <option
                    key={client._id}
                    value={client._id}
                  >
                    {client.name}
                  </option>
                ))}
              </select>
            )}
          />

          {errors.clientId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.clientId.message}
            </p>
          )}
        </div>

        {/* Amount */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Amount
          </label>

          <input
            type="number"
            {...register("amount", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={4}
            {...register("description")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Due Date */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Due Date
          </label>

          <input
            type="date"
            {...register("dueDate")}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dueDate.message}
            </p>
          )}
        </div>

      <button
  type="submit"
  disabled={isSubmitting}
  className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isSubmitting ? "Creating..." : "Create Invoice"}
</button>
      </form>
    </AdminLayout>
  );
};

export default CreateInvoicePage;