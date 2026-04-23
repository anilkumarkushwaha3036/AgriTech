#  AgriTech — Agricultural Services & Marketplace Platform

> **Connecting farmers with equipment, labor, and local markets — all in one place.**

AgriTech is a full-stack web platform built to digitize and simplify agricultural operations. From renting heavy machinery to hiring skilled farm labor and managing marketplace bookings — AgriTech serves as a unified hub for the farming community.

 **Live Deployment (AWS EC2):** [http://52.66.100.152/](http://52.66.100.152/)

---

##  The Core Problem

Farmers often rely on scattered, informal channels to find equipment rentals, hire labor, or sell produce locally. AgriTech centralizes these workflows into a single, secure, and mobile-friendly platform.

---

##  Key Features

| Feature | Description |
|---|---|
|  Equipment Marketplace | Browse, list, and rent agricultural machinery seamlessly |
|  Labor Hiring | Find and hire skilled farm workers for specific tasks |
|  Secure Payments | Razorpay-integrated checkout for bookings and transactions |
|  Auth System | JWT + bcryptjs based authentication with protected routes |
|  URL-based Images | Zero-storage image handling — URLs stored directly in MongoDB Atlas |
|  Unified Deployment | Multi-stage Docker build packaging frontend + backend into one image |
|  Responsive UI | Clean, dynamic interface built with React and custom Sass styling |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router v7, Sass, Lucide Icons, Axios |
| Backend | Node.js, Express.js 5.x |
| Database | MongoDB Atlas (Cloud) |
| Auth | JWT, bcryptjs |
| Payments | Razorpay |
| DevOps | Docker (multi-stage), AWS EC2 |

---

##  Deployment — Docker (Recommended)

The multi-stage Docker build packages the React frontend inside the Express backend into a single unified container.

```bash
# Build the image
docker build -t agritech-app:v1 .

# Run on port 80
docker run -d -p 80:5000 agritech-app:v1
```

> App will be live on port 80. No volumes needed — images are URL-based.

---

##  Environment Setup

Create `.env` files in both `Backend/` and `Frontend/` directories.

**Backend (`Backend/.env`)**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/agritech
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

**Frontend (`Frontend/.env`)**
```env
VITE_API_URL=/api
```

---

##  Local Development

```bash
# Clone the repo
git clone <repository_url>
cd AgriTech

# Install all dependencies (frontend + backend)
npm run install-all

# Start both servers simultaneously
npm start
```

---

##  Future Roadmap

- [ ] **Crop Advisory Module** — AI-based seasonal crop recommendations
- [ ] **Multilingual Support** — Hindi and regional language UI
- [ ] **Farmer Ratings & Reviews** — Trust system for labor and equipment providers
- [ ] **SMS Notifications** — Booking confirmations via Twilio
- [ ] **Mobile App** — React Native version for low-connectivity rural areas

---

##  Prerequisites

- Node.js v18+
- MongoDB Atlas connection string
- Razorpay test credentials
- Docker (for production deployment)

---
