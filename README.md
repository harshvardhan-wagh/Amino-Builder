
# 🧩 Amino Acid Builder

A visual drag-and-drop web app to build peptide/amino acid sequences and calculate basic properties (like molecular weight) using a Node.js + Express backend and React + Vite frontend.

---

## 🚀 Features

- 🧱 **Drag & drop** amino acids to build custom sequences  
- 💾 **Export** sequence as a `.txt` file  
- ⚗️ **Calculate** molecular weight via backend API  
- 🌈 Clean, responsive UI built with **React + TailwindCSS**  
- 🔗 Frontend + Backend linked via REST API  
- 🐳 Easy to run using **Docker Compose**

---

## 🗂️ Project Structure

```

amino-builder/
├─ frontend/       → React + Vite (UI)
│  ├─ src/components/AminoAcidBuilder.tsx
│  ├─ Dockerfile
│  └─ package.json
├─ backend/        → Node.js + Express (API)
│  ├─ src/server.ts
│  ├─ src/routes/calc.ts
│  ├─ Dockerfile
│  └─ package.json
├─ docker-compose.yml
└─ README.md

````

---

## ⚙️ Run Locally (Without Docker)

### 1️⃣ Start the Backend
```bash
cd backend
npm install
npm run dev
````

Backend runs on **[http://localhost:5000](http://localhost:5000)**

### 2️⃣ Start the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**

---

## 🐳 Run with Docker (Recommended)

Make sure you have **Docker** and **Docker Compose** installed.

### 1️⃣ Build & Start Containers

```bash
docker compose up --build
```

### 2️⃣ Open in Browser

Frontend → [http://localhost:5173](http://localhost:5173)
Backend API → [http://localhost:5000/api/calc](http://localhost:5000/api/calc)

---

## 🧠 API Example

**POST** `/api/calc`
Request:

```json
{ "sequence": "ACDEFG" }
```

Response:

```json
{
  "sequence": "ACDEFG",
  "molecularWeight": "830.83"
}
```

---

## 🧑‍💻 Developer Notes

* Make sure to use Node.js **v22+**
* Frontend and backend run independently for development
* When using Docker, both containers communicate automatically
* For production, you can build the frontend and serve it directly from the backend

---

## 📜 License

MIT © 2025 – Amino Builder Project




