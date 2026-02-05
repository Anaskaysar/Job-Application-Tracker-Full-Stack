# Job Application Tracker (Full Stack)

A full-stack web application to track and manage job applications across different companies and stages in the hiring process. Designed to help users stay organized, monitor progress, and maintain notes for each application.

## 🚀 Live Demo
Frontend: https://jobs.yourdomain.com  
Backend API: https://api-jobs.yourdomain.com

## 🧠 Features
- User authentication (JWT-based)
- Create, update, delete job applications
- Application status tracking:
  - Applied
  - Interview
  - Offer
  - Rejected
- Filter applications by status or company
- Notes per application
- Secure RESTful APIs

## 🛠️ Tech Stack
### Frontend
- React
- Axios
- React Router

### Backend
- Django
- Django REST Framework
- JWT Authentication
- PostgreSQL

### Deployment
- Frontend: Vercel (custom subdomain)
- Backend: AWS EC2 (Docker, Gunicorn, Nginx)

## 🗂️ API Endpoints (Sample)
| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/auth/login/ | User login |
| POST | /api/auth/register/ | User registration |
| GET | /api/applications/ | List applications |
| POST | /api/applications/ | Create application |
| PUT | /api/applications/:id/ | Update application |
| DELETE | /api/applications/:id/ | Delete application |

## ⚙️ Local Setup
```bash
git clone https://github.com/yourusername/job-tracker-backend.git
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

```
Designed and deployed a serverless backend using AWS Lambda, API Gateway, DynamoDB, and S3, supporting authenticated CRUD operations and secure file uploads.
vs
Deployed a Django application on AWS EC2, containerized with Docker, using S3 for file storage and secure environment configuration.