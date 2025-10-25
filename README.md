# 🧠 MERN Admin Dashboard

This is an **Admin Dashboard** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It allows the admin to manage agents, upload CSV files, and automatically distribute tasks among agents.

---

## 🏗️ Tech Stack

- ⚛️ React 18

- ⚡ Vite

- 💅 CSS / Tailwind (optional)

- 🌐 Axios

- 🔒 JWT Authentication

---

## 📁 Project Structure

### 🧩 Backend Structure

![BackendStructure](./screenshorts/backendStructure.png)

### 🎨 Frontend Structure

![FrontendStructure](./screenshorts/frontendStructure.png)

---

## ⚙️ Environment Variables

### 🔙 Backend (.env)
```bash
PORT=port_number
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---
## 🚀 Setup & Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/mern-admin-dashboard.git
cd mern-admin-dashboard
```

### 2️⃣ Install Dependencies
```bash
Backend:

cd backend
npm install
```

```bash
Frontend:

cd frontend
npm install
```
### 3️⃣ Update package.json (scripts section)
```bash
Open package.json and add:

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

###  4️⃣ Run the Application
```bash
Start Backend: 

cd backend
npm run dev
```

```bash
Start Frontend:

cd frontend
npm run dev
```
---

### 📤 Upload & Distribution Flow
---

```bash
1. Admin logs in.

2. Uploads a .csv file containing columns: FirstName, Phone, Notes

3. The backend automatically distributes entries evenly among all agents.

4. Each agent’s totalTasks count updates accordingly.
```

### 🔐 Authentication

```bash
Admin & Agent login is JWT-based.

Protected routes check tokens using middleware (authMiddleware.js).

Tokens are stored in sessionStorage on the frontend.
```
---

### 🧠 Key Features
---

    ✅ Admin Login / Logout

    ✅ Add Agents

    ✅ Upload CSV & auto-distribute tasks

    ✅ Token-based Authentication

    ✅ Task summary dashboard

    ✅ Error handling & form validation 



---

### 🖼️ Screenshots
---
**Admin Login Page**

![loginPage](screenshorts/login.png)

**Admin Dashboard**

![loginPage](screenshorts/dashboard.png)

**Add Agent**

![loginPage](screenshorts/addAgent.png)

**Upload File**

![loginPage](screenshorts/uploadFile.png)

**View Agents**

![loginPage](screenshorts/viewAgents.png)

**Task List**

![loginPage](screenshorts/list.png)

---

<!-- ### 👨‍💻 Author
---

Vaibhav Kumar
📧 your-email@example.com

🔗 LinkedIn
 | GitHub
 | Portfolio -->