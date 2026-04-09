# 🚀 Containerized Multi-Service Application

A full-stack **Task Manager web application** built using modern DevOps practices.
This project demonstrates **Docker containerization, Kubernetes orchestration, and CI/CD concepts** in a real-world setup.

---

## 📌 Project Overview

This project is a **multi-service application** consisting of:

* 🎨 **Frontend** – React (served via Nginx)
* ⚙️ **Backend** – Node.js + Express (REST API)
* 🗄️ **Database** – PostgreSQL
* 🐳 **Containerization** – Docker & Docker Compose
* ☸️ **Orchestration** – Kubernetes (Deployments, Services, HPA)
* 🔁 **DevOps** – CI/CD pipeline (GitHub Actions)

---

## 🧠 Key Features

* ✅ Create, update, delete tasks (CRUD operations)
* ✅ REST API architecture
* ✅ Persistent storage using PostgreSQL
* ✅ Multi-container architecture
* ✅ Kubernetes deployments with scaling
* ✅ Health checks & readiness probes
* ✅ Horizontal Pod Autoscaling (HPA)

---

## 🏗️ Architecture

```
Browser (User)
     ↓
Frontend (React + Nginx)
     ↓
Backend (Node.js API)
     ↓
PostgreSQL Database
```

In Kubernetes:

```
Frontend Pod → Backend Service → Backend Pods → DB Service → PostgreSQL Pod
```

---

## 📁 Project Structure

```
containerized-app/
│
├── frontend/              # React app + Nginx config
├── backend/               # Node.js Express API
├── k8s/                   # Kubernetes YAML files
│   ├── namespace.yaml
│   ├── postgres.yaml
│   ├── backend.yaml
│   ├── frontend.yaml
│
├── docker-compose.yml     # Local development setup
├── .github/workflows/     # CI/CD pipeline
└── README.md
```

---

## ⚙️ Technologies Used

| Layer         | Technology       |
| ------------- | ---------------- |
| Frontend      | React, Nginx     |
| Backend       | Node.js, Express |
| Database      | PostgreSQL       |
| Container     | Docker           |
| Orchestration | Kubernetes       |
| DevOps        | GitHub Actions   |

---

# 🐳 Running with Docker (Week 3)

## Step 1: Build and run

```bash
docker compose up --build
```

## Step 2: Open app

```
http://localhost:3000
```

---

# ☸️ Running with Kubernetes (Week 4)

## Step 1: Enable Kubernetes (Docker Desktop)

## Step 2: Apply all manifests

```bash
kubectl apply -f k8s/
```

## Step 3: Verify

```bash
kubectl get pods -n taskapp
kubectl get services -n taskapp
```

## Step 4: Port-forward services

```bash
kubectl port-forward svc/frontend 3000:80 -n taskapp
kubectl port-forward svc/backend 5000:5000 -n taskapp
```

## Step 5: Open app

```
http://localhost:3000
```

---

# 🔁 CI/CD Pipeline (Week 5)

The project includes a GitHub Actions workflow that:

* ✅ Builds Docker images
* ✅ Runs checks/tests
* ✅ Pushes images
* ✅ Deploys updates automatically

---

# ⚠️ Challenges Faced & Solutions

### ❌ Issue: `ErrImageNeverPull`

**Solution:** Changed `imagePullPolicy` and used versioned tags.

---

### ❌ Issue: Backend using old code

**Solution:** Rebuilt Docker image using `--no-cache` and updated tag.

---

### ❌ Issue: Frontend couldn't connect to backend

**Cause:** Used `backend` service name in browser
**Solution:** Used `localhost` with port-forwarding.

---

# 🧠 Key Learnings

* Difference between **container networking vs browser networking**
* Importance of **image versioning in Kubernetes**
* How **Docker ensures consistency**
* How **Kubernetes manages scaling and services**
* Debugging real-world DevOps issues

---

# 📊 Future Improvements

* 🔐 Add authentication (JWT)
* 🌐 Deploy on cloud (AWS/GCP)
* 📦 Use Helm charts
* 📈 Add monitoring (Prometheus + Grafana)

---

# 👨‍💻 Author

**Sarthak Khandelwal**

---

# ⭐ One-Line Summary

> A full-stack containerized application demonstrating Docker, Kubernetes, and DevOps practices with real-world debugging and deployment experience.

---
