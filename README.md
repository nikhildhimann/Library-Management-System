# 📚 Library Management System

A full-featured MERN (MongoDB, Express.js, React.js, Node.js) stack application for managing a digital library. Built with role-based authentication, book inventory management, borrowing system, user dashboards, and more.

## 🚀 Features

### ✅ Authentication & Roles
- Register/Login with JWT authentication
- Role-based access (User / Admin)

### 📘 Book Management
- Add, Edit, Delete books (Admin only)
- Search books by title, author, or ISBN
- Track availability (Available / Borrowed / Lost)

### 👥 User Management (Admin)
- Add, edit, and delete users
- Manage user details (name, ID, contact)

### 📖 Borrow & Return Books
- Users can borrow and return books
- Track due dates and return status

### 🔔 Notifications
- Alerts for due dates and borrowed books (Email/In-app)

### 📜 Borrowing History
- Users can view past borrowing records with return/due dates

### 💰 Fine Management
- Admin can track overdue fines and mark them as paid

---

## 🧑‍💻 Tech Stack

| Frontend        | Backend         | Database     | Styling     |
|----------------|------------------|--------------|-------------|
| React.js       | Node.js          | MongoDB      | Bootstrap 5 |
| React Router   | Express.js       | Mongoose     | Custom CSS  |

---

## 📂 Folder Structure

```

Library-Management-System/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.js
└── README.md

````

---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/nikhildhimann/Library-Management-System.git
cd Library-Management-System
````

### 2. Setup Backend

```bash
cd backend
npm install
# Create a .env file (see .env.example)
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the `/backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## ✨ Screenshots

## ✨ Landing Page
> <img width="1431" height="1080" alt="1st" src="https://github.com/user-attachments/assets/ee7c93e6-c0aa-4924-90e7-f334c94bcfe1" />

## 🛠️ Register Page
> <img width="1310" height="808" alt="register" src="https://github.com/user-attachments/assets/fd01f011-c73f-42f8-8c55-f7a408164df9" />


---

## 🛠️ Status

✅ Completed:

* Auth (Login/Register)
* Role-based Dashboards
* Book CRUD (Admin)
* Responsive UI with Bootstrap

🧪 In Progress / Planned:

* Email Notifications
* PDF/CSV Report Export
* Charts and Analytics

---

## 📬 Contact

**Nikhil Dhiman**
📧 [LinkedIn](https://www.linkedin.com/in/nikhildhimaann)
💼 Full Stack Developer (MERN)

---

## 🪪 License

This project is open-source and available under the [MIT License](LICENSE).

```

---

You can now paste this into your `README.md` file inside your GitHub repo (`Library-Management-System`). Let me know if you'd like a downloadable file or want me to include GitHub action badges, deployed demo links, or sample screenshots.
```
