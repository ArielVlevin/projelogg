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
git clone https://github.com/YOUR_USERNAME/log-management.git
cd log-management
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

Create a `.env` file in the root directory and add the following:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/logs-db
NEXTAUTH_SECRET=your_secret_key
```

### 4️⃣ Start the application

```bash
npm run dev
```

Your project will be running at [http://localhost:3000](http://localhost:3000).

---

## 🐳 Running with Docker

### 1️⃣ Build and start the container

```bash
docker-compose up --build -d
```

### 2️⃣ Stopping the container

```bash
docker-compose down
```

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

👤 **Your Name**\
📧 [your.email@example.com](mailto:your.email@example.com)

---

🚀 **Happy Logging!** 🚀
