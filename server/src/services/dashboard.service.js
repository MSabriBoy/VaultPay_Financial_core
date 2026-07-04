import Invoice from "../models/Invoice.js";
import User from "../models/User.js";

import { ROLES } from "../constants/roles.js";
import { INVOICE_STATUS } from "../constants/invoiceStatus.js";

const getAdminDashboardStats = async () => {
  const [
    totalClients,
    totalInvoices,
    pendingPayments,
    paidRevenueResult,
  ] = await Promise.all([
    User.countDocuments({ role: ROLES.CLIENT }),

    Invoice.countDocuments(),

    Invoice.countDocuments({
      status: INVOICE_STATUS.PENDING,
    }),

    Invoice.aggregate([
      {
        $match: {
          status: INVOICE_STATUS.PAID,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]),
  ]);

  return {
    totalClients,
    totalInvoices,
    pendingPayments,
    paidRevenue:
      paidRevenueResult[0]?.totalRevenue ?? 0,
  };
};

const getClientDashboardStats = async (clientId) => {
  const [
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    paidAmountResult,
  ] = await Promise.all([
    Invoice.countDocuments({
      client: clientId,
    }),

    Invoice.countDocuments({
      client: clientId,
      status: INVOICE_STATUS.PAID,
    }),

    Invoice.countDocuments({
      client: clientId,
      status: INVOICE_STATUS.PENDING,
    }),

    Invoice.aggregate([
      {
        $match: {
          client: clientId,
          status: INVOICE_STATUS.PAID,
        },
      },
      {
        $group: {
          _id: null,
          totalPaid: {
            $sum: "$amount",
          },
        },
      },
    ]),
  ]);

  return {
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    paidAmount:
      paidAmountResult[0]?.totalPaid ?? 0,
  };
};

export {
  getAdminDashboardStats,
  getClientDashboardStats,
};