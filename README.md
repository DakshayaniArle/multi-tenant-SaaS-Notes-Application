# 📝 Multi-Tenant Notes App (SaaS)

A modern multi-tenant SaaS Notes application built with React (Vite), TailwindCSS, Node.js/Express, and MongoDB/Postgres.
It supports tenant-based isolation, role-based access control (RBAC), user invitations, and subscription upgrades — a solid foundation for real SaaS applications.

✨ Features

1. 🔐 Authentication & Authorization – JWT-based login/signup, role-based access (Admin & Member)

2. 🏢 Multi-Tenant Support – Tenant slug isolation, per-tenant data separation

3. 📋 Notes Management – Create, edit, delete, and view notes

4. 📨 User Invitations – Admins invite users with roles (Admin/Member)

5. 🚀 Subscription Upgrade – Upgrade tenant plan (Free → Pro)

6. 🎨 Modern UI – Responsive TailwindCSS + React components

7. ⚡ Fast Development – Vite for blazing-fast builds

# 🏗 Multi-Tenancy Approach

👉 We chose the Shared Schema with a Tenant ID Column approach.

🔹 Why this approach?

✅ Easier to implement & maintain

✅ Scales well for many tenants (one schema)

✅ Tenant isolation enforced via tenantId field

✅ Efficient filtering (WHERE tenantId = ?) in MongoDB/Postgres

🔹 How it works

Every record (users, notes, etc.) includes a tenantId field.

APIs enforce tenant scope, e.g.:

GET /api/tenant/:slug/notes


→ fetches notes only for that tenant.

Prevents cross-tenant data leaks.

🔒 Ensures logical isolation without needing multiple schemas or databases.

# 🛠 Tech Stack

Frontend: React (Vite), TailwindCSS, Axios, React Router
Backend: Node.js, Express.js, MongoDB, JWT



# ⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/DakshayaniArle/multi-tenant-SaaS-Notes-Application
cd multi-tenant-notes-app

2️⃣ Backend Setup
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=your-mongo-uri
JWT_SECRET=your-secret-key


Run backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install


Create .env:

VITE_API=http://localhost:5000/


Run frontend:

### npm run dev

# 🔑 Environment Variables

## Backend (.env)

Variable	Description
PORT	Server port
MONGO_URI	MongoDB URI
JWT_SECRET	JWT signing key

## Frontend (.env)

Variable	Description
VITE_API	Backend API URL

## 📡 API Endpoints (Sample)
### Auth

POST /api/auth/signup → Register user

POST /api/auth/login → Login

### Notes

GET /api/tenant/:slug/notes → Get notes

POST /api/tenant/:slug/notes → Add note

### Tenant

POST /api/tenant/:slug/upgrade → Upgrade plan

### Users

POST /api/users/invite → Invite user (Admin only)


## 🔮 Future Improvements

📊 Analytics Dashboard for tenants

💳 Subscription billing integration (Stripe/Razorpay)

🛡 Audit logs & activity tracking

📱 Mobile-friendly PWA support

🤝 Contributing

## Fork the repo

Create a feature branch (feature/new-feature)

Commit changes

Push & open a PR

## 🚀 Deployment

This project is deployed using **Vercel**:

- **Frontend (React + Vite)**: [https://multi-tenant-saa-s-notes-applicatio-ashen.vercel.app/](https://multi-tenant-saa-s-notes-applicatio-ashen.vercel.app/)  
- **Backend (Express + MongoDB)**: [multi-tenant-saa-s-notes-applicatio-self.vercel.app](multi-tenant-saa-s-notes-applicatio-self.vercel.app)  
