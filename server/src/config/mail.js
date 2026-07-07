import nodemailer from "nodemailer";
import env from "./env.js";

const transporter = nodemailer.createTransport({
  host: env.mail.host,
  port: Number(env.mail.port),
  secure: false,
  requireTLS: true,

  auth: {
    user: env.mail.email,
    pass: env.mail.password,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});