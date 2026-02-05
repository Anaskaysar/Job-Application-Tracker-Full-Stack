# Job Application Tracker - Study Guide (Backend)

This document explains the technical decisions and steps taken during the backend development of the Job Application Tracker. Use this to review and understand the "why" behind each action.

## 1. Directory Structure Reorganization
**Action**: Moved `applications`, `manage.py`, etc., into a `backend/` folder.
**Why**: 
- **Separation of Concerns**: Clearly separates backend logic from frontend logic.
- **Scalability**: Makes it easier to manage deployments (e.g., Dockerizing only the backend) and Git ignores.

## 2. Virtual Environment (`venv`)
**Action**: Created a virtual environment and installed dependencies inside it.
**Why**:
- **Isolation**: Prevents dependency conflicts between different projects on your system.
- **Portability**: Allows you to generate a `requirements.txt` that reflects exactly what this project needs to run.

## 3. Django CORS Headers (`django-cors-headers`)
**Action**: Added `corsheaders` to `INSTALLED_APPS` and `MIDDLEWARE`.
**Why**:
- **Cross-Origin Resource Sharing (CORS)**: By default, browsers block scripts from one origin (e.g., `localhost:3000` for React) from making requests to another origin (e.g., `localhost:8000` for Django).
- This configuration tells Django to allow requests from our React frontend.

## 4. JWT Authentication (`djangorestframework-simplejwt`)
**Action**: Configured `REST_FRAMEWORK` to use `JWTAuthentication`.
**Why**:
- **Statelessness**: Unlike session-based auth, JWT doesn't require the server to store session data. The "token" contains all the user info needed.
- **Security**: Provides a secure way to verify users across different platforms (Web, Mobile).
- **Two-Token System**: 
    - `Access Token`: Short-lived (1 hour) for making API requests.
    - `Refresh Token`: Long-lived (1 day) to get a new access token without logging in again.

## 5. Database Migrations
**Action**: Ran `python manage.py migrate`.
**Why**:
- **Synchronization**: Django comes with built-in apps like `auth` and `admin`. Migrations create the necessary tables in your database (SQLite) so these systems can store users, groups, and logs.

## 6. URL Configuration
**Action**: Defined `TokenObtainPairView` and `TokenRefreshView` in `urls.py`.
**Why**:
- these are the standard "Login" and "Refresh" endpoints provided by the JWT library. They handle the logic of verifying credentials and issuing tokens automatically.

## 7. The Job Application Model
**Logic**: A "Model" in Django represents a table in your database. 
**Why**: 
- We need to store specific data for each job application (Company, Position, Status, etc.).
- Each application must "belong" to a specific User so that when you log in, you only see your own applications. This is handled by a `ForeignKey`.

**Component Breakdown**:
- `User`: This links the application to the Django built-in User model.
- `Choices`: Using a list of tuples for `status` ensures that users can only select from predefined values (Applied, Interview, etc.), preventing typos in the database.
- `auto_now_add=True`: This automatically sets the date when the object is first created.

## 8. Handling Files and Links
**Logic**: 
- **URLField**: Validates that the input is a proper web link.
- **FileField**: Stores the *path* to a file in the database, while the file itself is stored on the disk (or cloud).
- **TextField**: Unlike `CharField`, it has no max length (usually), making it perfect for long job descriptions.

**Why Media Settings?**: 
Django separates "Static" files (CSS/JS you write) from "Media" files (files users upload). We must tell Django where to put those resumes.
- `MEDIA_ROOT`: The actual folder on your computer.
- `MEDIA_URL`: The URL used to access the file in the browser (e.g., `/media/resume.pdf`).

## 9. Best Practice: Model Constants
**Logic**: Defining your choice strings as variables (e.g., `APPLIED = 'Applied'`) at the top of the class.
**Why**:
- **Consistency**: If you need to check the status in a view or a test, you can use `Application.APPLIED` instead of typing the string `'Applied'`. This prevents typos.
- **Maintenance**: If you decide to change the database value from "Applied" to "Submitted", you only have to change it in one place.

## 9. One-to-Many Relationships (Foreign Keys)
**Logic**: You created two models: `Application` and `ApplicationFile`.
**Why this is "Pro"**:
- **Flexibility**: A single job application often involves multiple files (Resume v1, Cover Letter, Portfolio link). By using a separate model with a `ForeignKey` pointing back to the `Application`, you allow a user to upload as many files as they want.
- **Data Integrity**: Each file correctly "belongs" to one application, and if the application is deleted, its files are also removed (`on_delete=models.CASCADE`).
