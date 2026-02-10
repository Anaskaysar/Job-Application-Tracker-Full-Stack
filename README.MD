# Job Application Tracker (Full Stack)

A professional job application tracking system designed to help users organize their job search. This project features a secure Django REST backend and a modern React frontend with a companion mobile app.

## 🔗 Live Production Links
- **Web App**: [https://jobtracker.kaysarulanas.me](https://jobtracker.kaysarulanas.me) (Vercel)
- **API (Admin)**: [https://api.jobtracker.kaysarulanas.me/admin/](https://api.jobtracker.kaysarulanas.me/admin/) (AWS EC2)
- **Full Project Report**: [Detailed System Architecture & Features](docs/project_report.md)

## 🚀 Features
### 📱 Mobile (New!)
- **Native Experience**: React Native app for iOS and Android.
- **On-the-Go**: Manage applications from anywhere with offline support.
- **Secure Auth**: Biometic-ready secure login storage.

### 💻 Web & API
- **Secure Authentication**: JWT-based login and registration (Google OAuth supported).
- **Job Tracking**: Manage company names, positions, stages, and application dates.
- **One-to-Many File Support**: Attach multiple resumes, portfolios, or cover letters.
- **Enhanced Details**: Save job descriptions for interview prep.
- **User Ownership**: Secure data isolation; users only manage their own data.

## 🛠️ Tech Stack
### Backend
- **Django & Django REST Framework**: Core API logic.
- **SimpleJWT**: Secure token-based authentication.
- **Gunicorn & Nginx**: Production web server setup on AWS.
- **SQLite**: Local development database (PostgreSQL on Production).

### Frontend
- **React (Vite)**: Fast, modern UI development.
- **Tailwind CSS**: Professional utility-first styling.
- **Axios**: API communication with JWT interceptors.

## ⚙️ Deployment & Setup

### 1. Local Development
#### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### 2. Production Deployment
#### Frontend (Vercel)
The frontend is auto-deployed via GitHub or manually via:
```bash
cd frontend
npx vercel --prod
```

#### Backend (AWS EC2)
To update the live API, connect via SSH and pull changes:
```bash
ssh -i "jobtracker-key.pem" ubuntu@api.jobtracker.kaysarulanas.me

# Once on the server:
cd ~/Job-Application-Tracker-Full-Stack
git pull origin main
sudo systemctl restart gunicorn
```

## 🗂️ API Endpoints
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/login/` | User Login |
| POST | `/api/auth/registration/` | New User Registration |
| POST | `/api/auth/google/` | Google OAuth Authentication |
| GET | `/api/applications/` | List user applications |
| POST | `/api/applications/` | Create application |

---
*Note: This project is part of a 3-week resume project challenge.*

