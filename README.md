# 🎂 Bakery Management System

A full-stack bakery management system built using **Angular 20** (Frontend) and **Node.js + Express + MongoDB/MySQL** (Backend).

This system includes:
- 🧑‍🍳 Staff & Customer Management
- 📦 Product Listings
- 🛒 Order Placement & Status Update
- 📊 Reports and PDF Generation
- 🔐 Login & Profile Dashboard

---

## 🧩 Tech Stack

| Layer      | Technology                     |
|------------|--------------------------------|
| Frontend   | Angular 20                     |
| Backend    | Node.js + Express              |
| Database   | MongoDB or MySQL               |
| Styling    | HTML + CSS (Custom Components)|
| Reports    | jsPDF / html2canvas / PDFKit   |

---

## 🖥️ Frontend Setup (Angular)

### 🔧 1. Install Dependencies
```bash
npm install
```

### 🚀 2. Run the Angular App
```bash
ng serve
```

Open your browser and visit:  
➡️ [`http://localhost:4200`](http://localhost:4200)

---

## 🗂️ Backend Setup (Node.js + Express)

### 📁 1. Open `backend/` folder
Open your integrated terminal and navigate to the `backend` folder.

### 🔧 2. Install Backend Dependencies
```bash
npm install
```

### 🏃‍♂️ 3. Start the Backend Server
```bash
node server.js
```

If successful, the backend runs on:  
➡️ [`http://localhost:5000`](http://localhost:5000)

Make sure MongoDB/MySQL is running and configured correctly in your DB connection file.

---

## 🧪 Running Tests

### ✅ Unit Tests (Karma)
```bash
ng test
```

### 🧪 E2E Tests (Optional)
```bash
ng e2e
```

> 💡 You can integrate Protractor, Cypress, or Playwright for E2E testing.

---

## 📦 Build for Production

To create an optimized build for deployment:
```bash
ng build --prod
```

Build output will be inside the `dist/` directory.

---

## 🔗 Helpful Angular CLI Commands

- Generate Component  
  ```bash
  ng generate component component-name
  ```

- Generate Service  
  ```bash
  ng generate service service-name
  ```

- Full Help  
  ```bash
  ng generate --help
  ```

---

## 📄 Features Overview

✅ Responsive Admin Dashboard  
✅ Customer, Staff, and Product Management  
✅ Order Status Update via Dropdown  
✅ Search, Filter by Status & Date  
✅ PDF Download of Order Invoice  
✅ Role-based Navigation (Admin/User Ready)  
✅ Fully Modular Code Structure

---

## 💡 Notes

- Use `.env` file or `config.js` to manage DB connection strings and secrets.
- Backend supports both **MongoDB** and **MySQL** (choose based on environment).
- You can deploy the backend on **Render/Heroku** and frontend on **Netlify/Vercel**.

---

## 👨‍💻 Developer

> Made with ❤️ by Omkar Deshmane  
> 📧 omkardeshmane832@gmail.com  
> 🔗 [https://www.linkedin.com/in/omkar-deshmane-526155340/]
> 🔗 Live Demo

