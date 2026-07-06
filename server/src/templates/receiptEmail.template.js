import formatCurrency from "../utils/formatCurrency.js";
import formatDate from "../utils/date.js";

const receiptEmailTemplate = (invoice) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />

<title>Payment Receipt</title>

</head>

<body
style="
margin:0;
padding:40px 0;
background:#f1f5f9;
font-family:Arial,Helvetica,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0">

<tr>

<td align="center">

<table
width="620"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border:1px solid #e2e8f0;
border-radius:12px;
overflow:hidden;
">

<tr>

<td
style="
background:#2563eb;
padding:32px;
text-align:center;
color:#ffffff;
">

<h1
style="
margin:0;
font-size:30px;
">
VaultPay Financial Core
</h1>

<p
style="
margin-top:10px;
font-size:15px;
opacity:.9;
">
Secure Payment Receipt
</p>

</td>

</tr>

<tr>

<td
style="
padding:40px;
">

<h2
style="
margin-top:0;
color:#0f172a;
">
Payment Successful 🎉
</h2>

<p
style="
font-size:15px;
line-height:28px;
color:#475569;
">

Hello
<strong>${invoice.client.name}</strong>,

</p>

<p
style="
font-size:15px;
line-height:28px;
color:#475569;
">

We've successfully received your payment.

Your invoice has been marked as
<strong>Paid</strong>.

Your payment receipt has been attached with this email.

</p>

<table
width="100%"
style="
margin-top:30px;
border-collapse:collapse;
">

<tr>

<td
style="
padding:14px;
background:#f8fafc;
border:1px solid #e2e8f0;
font-weight:bold;
">
Invoice Number
</td>

<td
style="
padding:14px;
border:1px solid #e2e8f0;
">
${invoice.invoiceNumber}
</td>

</tr>

<tr>

<td
style="
padding:14px;
background:#f8fafc;
border:1px solid #e2e8f0;
font-weight:bold;
">
Amount
</td>

<td
style="
padding:14px;
border:1px solid #e2e8f0;
">
${formatCurrency(
  invoice.amount,
  invoice.currency
)}
</td>

</tr>

<tr>

<td
style="
padding:14px;
background:#f8fafc;
border:1px solid #e2e8f0;
font-weight:bold;
">
Status
</td>

<td
style="
padding:14px;
border:1px solid #e2e8f0;
color:#16a34a;
font-weight:bold;
">
Paid
</td>

</tr>

<tr>

<td
style="
padding:14px;
background:#f8fafc;
border:1px solid #e2e8f0;
font-weight:bold;
">
Paid On
</td>

<td
style="
padding:14px;
border:1px solid #e2e8f0;
">
${formatDate(invoice.paidAt)}
</td>

</tr>

</table>

<p
style="
margin-top:35px;
font-size:15px;
line-height:28px;
color:#475569;
">

Please keep this email and attached receipt
for your accounting and financial records.

</p>

<p
style="
margin-top:40px;
font-size:15px;
line-height:28px;
color:#475569;
">

Need any help?

Simply reply to this email and our finance team
will be happy to assist you.

</p>

<p
style="
margin-top:35px;
font-size:15px;
line-height:28px;
color:#475569;
">

Regards,

<br><br>

<strong>VaultPay Finance Team</strong>

</p>

</td>

</tr>

<tr>

<td
style="
background:#f8fafc;
padding:24px;
text-align:center;
font-size:13px;
color:#64748b;
">

© ${new Date().getFullYear()} VaultPay Financial Core

<br><br>

This is an automated payment confirmation email.

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};

export default receiptEmailTemplate;