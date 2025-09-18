cat << 'EOF' > README.md
# 🍔 BiteBuddy – MERN Food Delivery App 

**BiteBuddy** is a modern **MERN (MongoDB, Express, React, Node.js)** food delivery platform with **Stripe integration** for secure payments.  
Users can browse restaurants, explore menus, add items to cart, place orders, and pay seamlessly.
## 🌍 Deployment - 🔗 Live Demo
### 🔹 BiteBuddy Live App : https://food-delivery-platform-silk.vercel.app/
### 🔹 Admin Page : https://food-delivery-platform-admin.vercel.app/
### 🔹 Backend : https://food-delivery-platform-1-gc9e.onrender.com
---

## 🚀 Features
- 🔍 Browse restaurants & menus  
- 🛒 Cart management  
- 📦 Place and track orders  
- 👤 User authentication (JWT)  
- 💳 Stripe secure payments  
- 🎨 Responsive React frontend  

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Auth:** JWT + bcrypt  
- **Payments:** Stripe API
- **Deployment:** Vercel,Render 

---

## ⚡ Getting Started

### 1. Clone the repo
\`\`\`bash
git clone https://github.com/satishkoppanathi/QuickAI.git
cd QuickAI
\`\`\`

### 2. Install dependencies
\`\`\`bash
cd client && npm install
cd ../server && npm install
\`\`\`

### 3. Setup Environment Variables
Create \`.env\` in `/server`:
\`\`\`
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
\`\`\`

Create \`.env` in `/client`:
\`\`\`
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
\`\`\`

### 4. Run the app locally
Backend:
\`\`\`bash
cd server && npm start
\`\`\`

Frontend:
\`\`\`bash
cd client && npm start
\`\`\`
