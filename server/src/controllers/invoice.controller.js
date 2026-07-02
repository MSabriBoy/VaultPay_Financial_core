import fs from "fs";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import {
  createInvoiceForClient,
  getAllInvoices,
  getClientInvoices,
  getInvoiceById,
} from "../services/invoice.service.js";

import { ROLES } from "../constants/roles.js";

const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await createInvoiceForClient(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Invoice created successfully.",
    data: invoice,
  });
});

const getInvoices = asyncHandler(async (req, res) => {
  const invoices =
    req.user.role === ROLES.ADMIN
      ? await getAllInvoices()
      : await getClientInvoices(req.user._id);

  res.status(200).json({
    success: true,
    data: invoices,
  });
});

const getInvoiceDetails = asyncHandler(async (req, res) => {
  const invoice = await getInvoiceById(req.params.invoiceId);

  if (!invoice) {
    throw new ApiError(404, "Invoice not found.");
  }

  // -------- IDOR Prevention --------
  if (
    req.user.role === ROLES.CLIENT &&
    invoice.client._id.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Access denied.");
  }

  res.status(200).json({
    success: true,
    data: invoice,
  });
});

const getReceipt = asyncHandler(async (req, res) => {
  const invoice = await getInvoiceById(req.params.invoiceId);

  if (!invoice) {
    throw new ApiError(404, "Invoice not found.");
  }

  if (
    req.user.role === ROLES.CLIENT &&
    invoice.client.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "Access denied.");
  }

  if (!invoice.receiptPath) {
    throw new ApiError(404, "Receipt not available.");
  }

  if (!fs.existsSync(invoice.receiptPath)) {
    throw new ApiError(404, "Receipt file not found.");
  }

  res.download(invoice.receiptPath, invoice.receiptFileName);
});

export {
  createInvoice,
  getInvoices,
  getInvoiceDetails,
  getReceipt,
};