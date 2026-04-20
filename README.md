# AgriTech

AgriTech is a comprehensive full-stack web application designed to empower the agricultural community. It serves as a centralized platform for renting and leasing agricultural equipment, hiring skilled farm labor, and managing local marketplace bookings. Built with modern web technologies, the platform offers a seamless experience with integrated payment solutions, secure authentication, and a responsive interface.

## 🚀 Features

- **Equipment Marketplace:** Browse, list, and rent agricultural machinery seamlessly.
- **Labor Hiring:** Find and hire skilled agricultural workers for tasks on the farm.
- **Secure Bookings & Payments:** Integrated with Razorpay for secure and easy financial transactions.
- **User Authentication:** JWT-based robust authentication system ensuring secure access to your account and bookings.
- **URL-based Image Integration:** Highly scalable, zero-storage feature passing image URLs directly to MongoDB Atlas.
- **Unified Docker Deployment:** Streamlined multi-stage Docker build packaging frontend and backend together for rapid EC2 deployment.
- **Responsive UI:** Modern, clean, and dynamic user interface built with React and Sass.

## 🛠 Tech Stack

**Frontend:**
- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Sass for custom aesthetics
- **Icons:** Lucide React
- **HTTP Client:** Axios (All endpoints dynamically routed)

**Backend:**
- **Environment:** Node.js + Express.js 5.x
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Payments:** Razorpay

---

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed **Node.js** (v18 or above) for local testing.
* You have a **MongoDB Atlas Cloud Database** connection string.
* You have a **Razorpay** account for test credentials.
* **Docker** installed (for production deployment).

---

## ⚙️ Environment Configuration

For the project to work, you must create `.env` files in both `Backend` and `Frontend` directories.

**1. Backend configuration (`Backend/.env`)**  
```env
PORT=5000
MONGODB_URI=mongodb+srv://<your_atlas_user>:<password>@cluster.mongodb.net/agritech
JWT_SECRET=supersecretjwtkey123
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

**2. Frontend configuration (`Frontend/.env`)**  
*(Note: Because of Docker bundling, use a relative path)*
```env
VITE_API_URL=/api
```

---

## 🚀 Docker Deployment (Production)

The quickest and recommended way to run AgriTech is using the provided Multi-stage Docker build. This packages the React frontend inside the Express backend into one unified instance.

**1. Build the unified Docker image:**
```bash
docker build -t agritech-app:v1 .
```

**2. Run the application (no volumes needed due to URL-based DB images):**
```bash
docker run -d -p 80:5000 agritech-app:v1
```
The app will now be available live on port 80 (HTTP).

---

## 📦 Local Development Setup

If you wish to modify the code locally without Docker:

**1. Clone the repository**
```bash
git clone <repository_url>
cd AgriTech
```

**2. Install all dependencies**  
Run the custom script to automatically install both backend and frontend dependencies:
```bash
npm run install-all
```

**3. Run the complete application**  
Start both the Express backend and the Vite frontend simultaneously:
```bash
npm start
```

---

## 📄 License
This project is licensed under the ISC License.
