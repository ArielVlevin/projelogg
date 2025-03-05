# Log Management System

📌 **Log Management System** is a full-stack application for managing logs of projects, tracking changes, and keeping detailed records of feature updates and bug fixes.

## ✨ Features

- Add, edit, and delete logs for different projects.
- Filter logs by project, date range, or change type (Feature / Bug Fix).
- User-friendly UI with advanced search and filtering.
- Built using **Next.js**, **MongoDB**, **React**, and **TailwindCSS**.

---

## 📸 Screenshots

_(Add project screenshots here)_

---

## 🚀 Getting Started (Without Docker)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ArielVlevin/projelogg.git
cd projelogg
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=mongodb://root:example@mongo_db:27017/projelogg?authSource=admin
PORT=3000
NODE_ENV=production
```

### 4️⃣ Start the application

```bash
npm run dev
```

Your project will be running at [http://localhost:3000](http://localhost:3000).

---

## 🐳 Running with Docker

### 1️⃣ **Build and start the container (first time or after Dockerfile changes)**

```bash
docker compose up --build -d
```

### 2️⃣ **Start the server (without rebuilding, if it's already built)**

```bash
docker compose up -d
```

### 3️⃣ **Stopping the container**

```bash
docker compose down
```

### 4️⃣ **Stopping and removing everything (including volumes & database data)**

```bash
docker compose down -v
```

---

🚀 **Tip:** Use `docker logs -f projelogg-app-1` to view live logs of the app.

---

## 🔄 Automatic Updates with Watchtower

To automatically update the running Docker container when pushing new changes to GitHub:

```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower --interval 86400
```

_(This checks for updates \***\*every 24 hours\*\*** instead of every 30 seconds.)_

---

## 🛠 Troubleshooting

1️⃣ **MongoDB connection issues?**

- Make sure your `.env` file contains the correct MongoDB URI.
- If using **Docker**, ensure the database container is running.

2️⃣ **Port conflicts?**

- Ensure port **3000** is available, or change it in `docker-compose.yml`.

3️⃣ **Logs not appearing?**

- Check server logs: `docker logs -f log-management-app`

---

## 📜 License

This project is licensed under the MIT License.

---

## ✨ Contributors

👤 **Ariel Levin**\
📧 [ariel.v.levin@gmail.com](mailto:ariel.v.levin@gmail.com)

---

🚀 **Happy Logging!** 🚀
