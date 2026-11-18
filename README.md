# VaultPay Financial Core 💳

**A Secure Invoice Management & Payment Processing Platform**

VaultPay Financial Core is a full-stack financial management application designed to simplify invoice generation, payment processing, client management, and financial tracking.

The platform provides separate dashboards for administrators and clients, secure authentication, Stripe-powered online payments, downloadable PDF receipts, and role-based access control.

Built with the MERN stack, VaultPay focuses on security, reliability, and a smooth financial transaction experience.

## 🚀 Live Demo

- **Frontend:** [Frontend Link](https://vault-pay-financial-core-omega.vercel.app/)
- **Backend API:** [Backend Link](https://vaultpay-financial-core-y3n7.onrender.com)

## ✨ Key Features

### 🔐 Authentication & Security
- Secure user registration and login.
- JWT-based authentication.
- Role-based access control (Admin & Client).
- Protected API routes.
- Password hashing and validation.
- HTTP security headers using Helmet.
- API rate limiting to prevent excessive requests.
- Secure environment variable configuration.

### 📊 Admin Dashboard
- Overview of total clients and invoices.
- Track pending payments.
- Monitor total paid revenue.
- View financial statistics.
- Manage client accounts.
- Create and manage invoices.

### 👤 Client Dashboard
- Personalized client dashboard.
- View assigned invoices.
- Track invoice payment status.
- Monitor paid and pending invoices.
- Access invoice details and payment options.
- Download payment receipts.

### 🧾 Invoice Management
- Generate unique invoice numbers.
- Create invoices for registered clients.
- Specify invoice amount, currency, description, and due date.
- Track invoice status (Pending / Paid).
- Store invoice and payment information in MongoDB.

### 💳 Stripe Payment Integration
- Integrated Stripe Checkout for online payments.
- Generate secure Stripe Checkout Sessions.
- Process online invoice payments.
- Handle Stripe webhook events.
- Automatically update invoice payment status.
- Store Stripe Checkout Session and Payment Intent references.

### 📄 PDF Receipt Generation
- Generate professional PDF payment receipts.
- Download receipts after successful payments.
- Include invoice details, transaction information, and payment status.
- Professional one-page receipt layout.

### 📧 Email Notifications
- SMTP-based email configuration.
- Email service integration for application notifications.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| State Management | React Context API, Custom Hooks |
| API Integration | Axios |
| Forms & Validation | React Hook Form, Zod |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Payment Gateway | Stripe |
| PDF Generation | PDFKit |
| Email | Nodemailer / SMTP |
| Security | Helmet, CORS, Express Rate Limit |
| Deployment | Vercel, Render |

## 🏗️ Project Architecture

VaultPay follows a client-server architecture.

```text
                 ┌──────────────────────┐
                 │     React Frontend   │
                 │       (Vercel)       │
                 └──────────┬───────────┘
                            │
                       Axios API
                            │
                 ┌──────────▼───────────┐
                 │    Express Backend   │
                 │       (Render)       │
                 └──────────┬───────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
         ┌────▼────┐  ┌─────▼────┐  ┌─────▼────┐
         │ MongoDB │  │  Stripe  │  │  SMTP    │
         │Database │  │ Payments │  │  Email   │
         └─────────┘  └──────────┘  └──────────┘
```

## 📁 Project Structure

```text
VaultPay-Financial-Core/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       └── utils/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── services/
│       ├── templates/
│       ├── utils/
│       └── app.js
│
└── README.md
```

*Note: Adjust the directory structure according to your actual repository.*

## ⚙️ Installation & Setup

Follow these steps to run VaultPay locally.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd VaultPay-Financial-Core
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_email_app_password
SMTP_FROM=your_sender_email
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Configure the frontend environment variables according to your API configuration.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

### 4. Stripe Webhook Setup

For local payment testing, install and configure the Stripe CLI.

Authenticate Stripe CLI and forward webhook events to your backend webhook endpoint.

```bash
stripe listen --forward-to localhost:5000/api/payments/webhook
```

Use the webhook signing secret provided by Stripe CLI in your backend environment configuration.

## 🔑 Demo Login Credentials

For demonstration purposes, create an Admin account and a Client account using the registration flow or your configured seed process.

| Role | Email | Password |
|---|---|---|
| Admin | rihan@gmail.com | Rihan@123 |
| Client | aleena.ms.khan@gmail.com | Aleena@123 |

## 🔒 Security Implementation

Security is an important part of VaultPay.

- JWT authentication for protected resources.
- Password hashing before database storage.
- Middleware-based authorization.
- Role-specific access restrictions.
- Helmet for HTTP security headers.
- Express Rate Limit for API protection.
- CORS configuration.
- Input validation and error handling.
- Stripe webhook verification for payment events.
- Sensitive configuration stored in environment variables.

## 💡 Key Learning Outcomes

While developing VaultPay Financial Core, I worked on:

- Designing a full-stack MERN application.
- Implementing authentication and authorization.
- Developing RESTful APIs.
- Building role-based dashboards.
- Integrating Stripe Checkout.
- Handling payment webhook events.
- Generating downloadable PDF receipts using PDFKit.
- Working with MongoDB schemas and relationships.
- Implementing backend security practices.
- Debugging API integration and deployment issues.
- Deploying frontend and backend applications independently.

## 🚀 Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Payment Gateway | Stripe |

## 👨‍💻 Developer

**Rihan Sabri**

Full Stack Developer

- GitHub: [MSabriBoy](https://github.com/MSabriBoy)
- LinkedIn: [Rihan Sabri](www.linkedin.com/in/rihansabri208)

## 📌 Future Improvements

- Advanced financial analytics.
- Automated payment reminders.
- Recurring invoice generation.
- Enhanced transaction history.
- Additional payment gateway integrations.
- Advanced reporting and export functionality.

**VaultPay Financial Core** — Simplifying financial management through secure digital transactions.

⭐ If you find this project useful, consider giving the repository a star!
