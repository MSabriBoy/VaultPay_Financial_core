import User from "../models/User.js";
import Invoice from "../models/Invoice.js";

import asyncHandler from "../utils/asyncHandler.js";
import { ROLES } from "../constants/roles.js";
import { INVOICE_STATUS } from "../constants/invoiceStatus.js";

const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalClients,
    totalInvoices,
    paidInvoices,
    pendingInvoices,
    revenue,
  ] = await Promise.all([
    User.countDocuments({ role: ROLES.CLIENT }),

    Invoice.countDocuments(),

    Invoice.countDocuments({
      status: INVOICE_STATUS.PAID,
    }),

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

  res.status(200).json({
    success: true,
    data: {
      totalClients,
      totalInvoices,
      paidInvoices,
      pendingInvoices,
      totalRevenue: revenue[0]?.totalRevenue || 0,
    },
  });
});

const getClients = asyncHandler(async (req, res) => {
  const clients = await User.find({
    role: ROLES.CLIENT,
  }).select("-password");

  res.status(200).json({
    success: true,
    data: clients,
  });
});

export { getDashboardStats, getClients };