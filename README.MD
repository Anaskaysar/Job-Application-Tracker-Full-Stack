# Job Application Tracker (Full Stack)

A professional job application tracking system designed to help users organize their job search. This project features a secure Django REST backend and a modern React frontend with a companion mobile app.

## 🔗 Live Production Links
- **Web App**: [https://jobtrackerr.com](https://jobtrackerr.com) (Vercel)
- **API (Admin)**: [https://api.jobtrackerr.com/admin/](https://api.jobtrackerr.com/admin/) (AWS EC2)
- **Full Project Report**: [Detailed System Architecture & Features](docs/project_report.md)

## 🚀 Features
### 📱 Mobile (New!)
- **Native Experience**: React Native app for iOS and Android (Coming Soon!).
- **On-the-Go**: Manage applications from anywhere with offline support.
- **Secure Auth**: Biometic-ready secure login storage.

### 💻 Web & API
- **Secure Authentication**: JWT-based login and registration (Google OAuth supported).
- **Email Verification**: Complete email verification system with Brevo integration.
- **Job Tracking**: Manage company names, positions, stages, and application dates.
- **One-to-Many File Support**: Attach multiple resumes, portfolios, or cover letters.
- **Enhanced Details**: Save job descriptions for interview prep.
- **User Ownership**: Secure data isolation; users only manage their own data.
- **Profile Management**: Update user profile information with dedicated UI.
- **Domain Email System**: Professional email addresses (`info@jobtrackerr.com`, `noreply@jobtrackerr.com`).

### 🔧 Recent Improvements (Feb 2026)
- ✅ **Fixed CORS & Authentication**: Resolved domain configuration issues
- ✅ **Google OAuth Popup Fix**: Added COOP/COEP headers for proper popup handling
- ✅ **Email System**: Complete Brevo integration with domain verification
- ✅ **Vercel CI/CD**: Fixed build pipeline with proper Node.js configuration
- ✅ **Profile UI**: Added Update button and improved user experience

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

#### Backend (AWS EC2)
To update the live API, connect via SSH and pull changes:
```bash
ssh -i "jobtracker-key.pem" ubuntu@api.jobtrackerr.com
cd /home/ubuntu/Job-Application-Tracker-Full-Stack/backend
git pull origin main
sudo systemctl restart gunicorn
```

### 3. Email Configuration
**Brevo Integration Setup:**
- **DNS Records**: TXT and CNAME records configured for `jobtrackerr.com`
- **SMTP Settings**: Configured for transactional emails (300/day free plan)
- **Domain Emails**: `info@jobtrackerr.com` (contact), `noreply@jobtrackerr.com` (system)
- **Status**: Console backend (development), SMTP backend (production, pending activation)

### 4. API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login/` | User authentication |
| POST | `/api/auth/register/` | User registration |
| POST | `/api/auth/google/` | Google OAuth Authentication |
| GET | `/api/auth/user/` | Get current user info |
| POST | `/api/auth/registration/resend-email/` | Resend verification email |
| GET | `/api/applications/` | List user applications |
| POST | `/api/applications/` | Create application |
| PUT | `/api/applications/{id}/` | Update application |
| DELETE | `/api/applications/{id}/` | Delete application |

### 5. Environment Variables
**Required Backend Environment Variables:**
```bash
# Django Settings
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=api.jobtrackerr.com,localhost,127.0.0.1

# CORS Settings
CORS_ALLOWED_ORIGINS=https://jobtrackerr.com,https://www.jobtrackerr.com,http://localhost:5173
CSRF_TRUSTED_ORIGINS=https://jobtrackerr.com,https://www.jobtrackerr.com,https://api.jobtrackerr.com

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://api.jobtrackerr.com/accounts/google/login/callback/

# Email (Brevo)
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-brevo-login@gmail.com
EMAIL_HOST_PASSWORD=your-brevo-smtp-key
DEFAULT_FROM_EMAIL=noreply@jobtrackerr.com
```

## 🤝 Contributing

Contributions are always welcome! Please read our [Contributing Guide](CONTRIBUTING.md) to learn how you can get involved.

Please adhere to this project's [Code of Conduct](CODE_OF_CONDUCT.md).

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---
*Note: This project is part of a 3-week resume project challenge.*

## Open backend server for deployment
ssh -i "jobtracker-key.pem" ubuntu@api.jobtrackerr.com