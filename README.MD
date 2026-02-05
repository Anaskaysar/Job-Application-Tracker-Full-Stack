# Job Application Tracker (Full Stack)

A professional job application tracking system designed to help users organize their job search. This project features a secure Django REST backend and a modern React frontend.

## 🚀 Features
- **Secure Authentication**: JWT-based login and registration.
- **Job Tracking**: Manage company names, positions, status, and application dates.
- **One-to-Many File Support**: Attach multiple resumes, cover letters, or portfolios to a single application.
- **Enhanced Details**: Track job post URLs and save job descriptions for interview preparation.
- **User Ownership**: Secure data isolation; users only see and manage their own applications.

## 🛠️ Tech Stack
### Backend
- **Django & Django REST Framework**: Core API logic.
- **SimpleJWT**: Secure token-based authentication.
- **SQLite**: Local development database.
- **CORS Headers**: Configured for React integration.

### Frontend
- **React (Vite)**: Fast, modern UI development.
- **Axios**: API communication.
- **React Router**: Client-side navigation.
- **Lucide Icons**: Professional UI icons.

## ⚙️ Local Setup

### 1. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
python manage.py migrate
python manage.py runserver
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🗂️ API Endpoints
| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/token/` | Get Access/Refresh Token |
| POST | `/api/auth/token/refresh/` | Refresh Access Token |
| GET | `/api/applications/` | List user applications |
| POST | `/api/applications/` | Create application |
| GET | `/api/files/` | List application files |

---
*Note: This project is part of a 3-week resume project challenge.*