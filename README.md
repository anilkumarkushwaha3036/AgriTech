# AgriTech

AgriTech is a comprehensive full-stack web application designed to empower the agricultural community. It serves as a centralized platform for renting and leasing agricultural equipment, hiring skilled farm labor, and managing local marketplace bookings. Built with modern web technologies, the platform offers a seamless experience with integrated payment solutions, secure authentication, and a responsive interface.

## 🚀 Features

- **Equipment Marketplace:** Browse, list, and rent agricultural machinery seamlessly.
- **Labor Hiring:** Find and hire skilled agricultural workers for tasks on the farm.
- **Secure Bookings & Payments:** Integrated with Razorpay for secure and easy financial transactions.
- **User Authentication:** JWT-based robust authentication system ensuring secure access to your account and bookings.
- **Image Upload:** Upload images directly for equipment listings to provide a rich visual experience.
- **Responsive UI:** Modern, clean, and dynamic user interface built with React and Sass.

## 🛠 Tech Stack

**Frontend:**
- **Framework:** React 19 + Vite
- **Routing:** React Router v7
- **Styling:** Sass for custom aesthetics
- **Icons:** Lucide React
- **HTTP Client:** Axios

**Backend:**
- **Environment:** Node.js + Express.js
- **Database:** MongoDB via Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Payments:** Razorpay
- **File Uploads:** Multer

---

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed **Node.js** (v18 or above is recommended)
* You have a running instance of **MongoDB** (Local or MongoDB Atlas)
* You have a **Razorpay** account for test credentials

---

## ⚙️ Environment Configuration

For the project to work, `.env` files are required in both `Backend` and `Frontend` directories. You will find `.env.example` files in each which outline the required keys.

**1. Backend configuration**  
Create a `.env` file in the `/Backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/agritech
JWT_SECRET=supersecretjwtkey123
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

**2. Frontend configuration**  
Create a `.env` file in the `/Frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Installation & Setup

We have configured `concurrently` to make running the entire stack as simple as possible.

**1. Clone the repository and navigate into the project root**
```bash
git clone <repository_url>
cd AgriTech
```

**2. Install all dependencies**  
Run the custom script to automatically install both backend and frontend dependencies:
```bash
npm run install-all
```
*(Alternatively, you can manually run `npm install` inside both the `/Backend` and `/Frontend` directories)*

**3. Run the complete application**  
Start both the Express backend and the Vite frontend simultaneously:
```bash
npm start
```
- The frontend will be available at `http://localhost:5173`
- The backend will listen at `http://localhost:5000`

---

## 📁 Repository Structure

```
AgriTech/
├── Backend/
│   ├── src/
│   │   ├── config/        # Database and system configs
│   │   ├── controllers/   # Route handlers
│   │   ├── middlewares/   # Auth and file processing middlewares
│   │   ├── models/        # Mongoose data schemas
│   │   └── routes/        # Express route definitions
│   ├── uploads/           # Directory for physical image uploads
│   ├── .env               # Private backend variables
│   └── index.js           # Express App Entry Point
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context logic (e.g. AuthContext)
│   │   ├── pages/         # High-level page components
│   │   └── index.scss     # Global styling
│   ├── .env               # Public Vite environment variables
│   └── vite.config.js     # Vite configuration
│
└── package.json           # Root configuration for workspace commands
```

## 📄 License
This project is licensed under the ISC License.
