import mongoose from "mongoose";

import { INVOICE_STATUS } from "../constants/invoiceStatus.js";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "USD",
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(INVOICE_STATUS),
      default: INVOICE_STATUS.PENDING,
    },

    stripeCheckoutSessionId: {
      type: String,
      default: null,
    },

    stripePaymentIntentId: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    receiptFileName: {
      type: String,
      default: null,
    },

    receiptPath: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

invoiceSchema.index({
  client: 1,
  status: 1,
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;