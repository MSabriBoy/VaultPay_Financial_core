import Invoice from "../models/Invoice.js";
import User from "../models/User.js";

import ApiError from "../utils/ApiError.js";
import generateInvoiceNumber from "../utils/generateInvoiceNumber.js";

import { ROLES } from "../constants/roles.js";

const createInvoiceForClient = async (payload, adminId) => {
  const { clientId, amount, description, dueDate } = payload;

  if (!clientId || !amount || !description || !dueDate) {
    throw new ApiError(400, "All invoice fields are required.");
  }

  const client = await User.findById(clientId);

  if (!client || client.role !== ROLES.CLIENT) {
    throw new ApiError(404, "Client not found.");
  }

  const invoiceCount = await Invoice.countDocuments();

  const invoice = await Invoice.create({
    invoiceNumber: generateInvoiceNumber(invoiceCount + 1),
    client: client._id,
    issuedBy: adminId,
    amount,
    description,
    dueDate,
  });

  return Invoice.findById(invoice._id)
    .populate("client", "name email")
    .populate("issuedBy", "name");
};

const getAllInvoices = async () => {
  return Invoice.find()
    .populate("client", "name email")
    .populate("issuedBy", "name")
    .sort({ createdAt: -1 });
};

const getClientInvoices = async (clientId) => {
  return Invoice.find({ client: clientId })
    .populate("issuedBy", "name")
    .sort({ createdAt: -1 });
};

const getInvoiceById = async (invoiceId) => {
  return Invoice.findById(invoiceId)
    .populate("client", "name email")
    .populate("issuedBy", "name");
};

export {
  createInvoiceForClient,
  getAllInvoices,
  getClientInvoices,
  getInvoiceById,
};

//client1_id:"6a4444dae850fe3236e8ec67"
//client2_id:"6a444994caae5b5e5e426641"