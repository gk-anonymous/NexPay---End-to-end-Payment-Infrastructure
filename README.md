
<img width="1536" height="1024" alt="ChatGPT Image Jan 26, 2026, 07_50_31 AM" src="https://github.com/user-attachments/assets/c5ed6618-40cb-451b-970a-01b0a850745b" />

# 💳 Paytm-Style Digital Payments Platform

> A full-stack digital payments system supporting user transfers, merchant payments, QR-based transactions, secure on-ramp/off-ramp flows, and scalable financial infrastructure.

---

## 🚀 Overview

This project is a **Paytm-inspired payments platform** built with a **modern full-stack architecture**, focusing on:

* Secure money movement
* Fast transaction processing
* Merchant & user ecosystems
* Clean UI/UX with scalable backend systems

The system supports **peer-to-peer payments**, **merchant QR payments**, and **bank on-ramp/off-ramp**, while maintaining **transaction safety and data consistency**.

---

## 🧠 Product Thinking & Feature Planning

### How Features Were Designed

* Features are derived from **real payment product flows**
* Focus on **speed of execution without tech debt**
* Built for **startup velocity**, yet scalable to enterprise level

### Guiding Principles

* Ship fast, but don’t break money
* Explicit consistency over eventual ambiguity
* Clear separation of concerns (UI / API / DB)

---

## 🖼️ Product Screenshots

![Home Screen](https://github.com/user-attachments/assets/8066eb83-b8f5-49c5-8aac-bd96571b6f7e)
![Second Screenshot](https://github.com/user-attachments/assets/5ba898b3-f340-4b0c-9133-35012fe9cdc1)

![User Dashboard](https://github.com/user-attachments/assets/26765271-272c-4e81-9ad4-4f5b7eb616b4)
![Fourth Screenshot](https://github.com/user-attachments/assets/ca9328ee-52ef-4482-8229-16b1816be4cf)

![Prisma Database](https://github.com/user-attachments/assets/675d5cab-b5f3-4cf0-be47-21131f0a903b)
![Sixth Screenshot](https://github.com/user-attachments/assets/903e6cee-bcbc-4192-8f20-d4632a30dcc4)
![Seventh Screenshot](https://github.com/user-attachments/assets/0cb9d200-f692-467f-8cd8-b6e558c95bf8)
![Eighth Screenshot](https://github.com/user-attachments/assets/b3a375a1-238f-488f-aa74-076c983100cb)

---

## 🎥 Demo Video

> Upload your demo video and link it below.





https://github.com/user-attachments/assets/88a46502-a5b6-48d7-b4a5-5c967c51bddd




---

## ✨ Core Features

### 👤 User Features

* Email / Phone authentication
* Login with Google
* Wallet balance management
* P2P transfers via phone number or name
* QR code scanning for merchant payments
* Transaction history & status tracking
* Profile management (including profile image)

---

### 🏪 Merchant Features

* Merchant login & onboarding
* QR code generation for payment acceptance
* Real-time payment alerts
* Automatic bank off-ramp every 48 hours
* Transaction analytics

---

### 🏦 Payments Infrastructure

* Bank on-ramp (add money)
* Bank off-ramp (withdraw money)
* Transaction locking & concurrency handling
* Balance consistency using row-level locking

---

## 🧱 High-Level Architecture

```
Monorepo (Turborepo)
│
├── apps/
│   ├── web (Next.js Frontend)
│   ├── api (Express Auxiliary Services)
│
├── packages/
│   ├── ui (Shared UI components)
│   ├── db (Prisma schema & client)
│   ├── auth (Authentication logic)
```

---

## 🛠 Tech Stack

### Frontend

* Next.js
* Tailwind CSS
* NextAuth
* QR Code Scanner

### Backend

* Next.js API Routes
* Express (auxiliary services)
* Prisma ORM
* PostgreSQL

### Infrastructure

* Turborepo
* Cloud Deployment (Vercel / AWS ready)

---

## 🔐 Authentication

* Email & Phone based authentication
* Google OAuth
* Merchant & User roles
* Secure session handling

---

## 🗄 Database Design

### Database

* PostgreSQL

### ORM

* Prisma

### Key Concepts

* Row-level locking for wallet balance
* Explicit transactions for money movement
* Strong consistency over eventual consistency

> **Important Note**
> PostgreSQL transactions do NOT automatically lock rows.
> Wallet balance rows are **explicitly locked** to prevent double-spend issues.

---

## 🔄 Money Transfer Flow (Simplified)

1. Begin transaction
2. Lock sender balance row
3. Validate sufficient balance
4. Debit sender
5. Credit receiver
6. Commit transaction

This ensures:

* No race conditions
* No partial updates
* Financial correctness

---

## 📐 Low-Level Design (LLD)

* Modular service boundaries
* Clean API route signatures
* Explicit error handling
* Idempotent payment operations

---

## 🧩 Modules Overview

| Module    | Responsibility          |
| --------- | ----------------------- |
| Auth      | Login, sessions, roles  |
| Payments  | Transfers, QR, balances |
| Merchants | QR, settlements         |
| UI        | Shared components       |
| DB        | Schema, migrations      |

---

## 🔁 On-Ramp / Off-Ramp

* On-ramp: Bank → Wallet
* Off-ramp: Wallet → Bank
* Merchant settlements every 2 days
* Fully auditable transaction logs

---

## 🎨 UI / UX Philosophy

### UX

* Inspired by leading fintech products
* Minimal cognitive load
* Clear payment confirmations

### UI

* Tailwind-based design system
* Mobile-first
* Scalable component structure

---

## 🧪 Development Setup

```bash
git clone ""
npm install
- Run postgres either locally or on the cloud (neon.tech)

```jsx
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

- Copy over all .env.example files to .env
- Update .env files everywhere with the right db url
- Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`
- Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)"# NexPay---End-to-end-Payment-Infrastructure" 

```

---

## 🗺 Roadmap

* [ ] Push notifications
* [ ] Refund system
* [ ] Multi-currency support
* [ ] Fraud detection
* [ ] Admin dashboard
* [ ] Ledger-based accounting

---

## 🏗 Built As Part Of

**Paytm-Style Payments Project**
Module: **2 of 20**

---

## 📜 License

MIT License

---

## 👤 Author

**Gaurav Kamble**
Full-Stack Engineer








