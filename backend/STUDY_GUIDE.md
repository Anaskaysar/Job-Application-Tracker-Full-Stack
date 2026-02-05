# Full-Stack Job Application Tracker: Implementation & Logic Study Guide

This guide is designed to help you understand the core logic and technical decisions made during the development of this project. It serves as both a reference for the codebase and a learning resource for full-stack engineering principles.

---

## 1. Project Foundation & Configuration

### CORS Configuration
- **What**: Added `django-cors-headers` and configured `CORS_ALLOWED_ORIGINS` in `settings.py`.
- **Logic Hint**: In web development, browsers block requests from one domain (localhost:5173) to another (localhost:8000) for security. We must "whitelist" the frontend to allow communication.
- **Why**: Without this, your React app would be unable to reach your Django API.

### JWT Authentication (SimpleJWT)
- **What**: Set `rest_framework_simplejwt` as the default authentication class.
- **Logic Hint**: JWT is "Stateless." Instead of the server remembering who you are (Sessions), it gives you a digital "ID Card" (Token).
- **Instruction**: We set `ACCESS_TOKEN_LIFETIME` to 1 hour and created specific login/refresh URL endpoints.
- **Why**: It is secure, scalable, and the industry standard for APIs.

---

## 2. Model Design (The "Heart" of the Data)

### The Application Model (Single Record)
- **Choices Logic**: We used a list of tuples for `status`.
  - **Hint**: This ensures the data in the database matches exactly what the frontend expects ("Applied", "Interview", etc.).
- **URLField & FileField**: Used for job links and resumes.
  - **Hint**: `URLField` validates that the link is real; `FileField` handles the complex logic of moving binary files from the request to the server's storage.

### ApplicationFile (The Relationship Logic)
- **The One-to-Many Choice**: We created a separate model for files instead of putting one file field in the Application.
  - **Logic**: A user might have a Resume, a Cover Letter, and a Porfolio for *one* job. If we only had one field, we'd be stuck!
- **on_delete=models.CASCADE**: 
  - **Why**: If you delete a job application, you don't want "ghost files" left over. This setting cleans up the database automatically.
- **related_name="files"**:
  - **Logic**: This is a shortcut. It allows us to reach files from the application object in Python (`application.files.all()`) or in the Serializer.

---

## 3. The API Translator (Serializers)

### Nested Serialization
- **The Concept**: Showing the file data *inside* the application JSON.
- **Logic Hint**: If you don't nest them, React only gets a list of IDs (e.g., `[1, 2]`). By nesting, React gets the whole object (e.g., `[{name: 'resume.pdf', url: '...'}]`). This simplifies the frontend code significantly.
- **The Order Rule**: You must define the `ApplicationFileSerializer` **before** the `ApplicationSerializer` because Python reads from top to bottom.

---

## 4. The API Brains (Views)

### ModelViewSet
- **The "Shortcut" Logic**: `ModelViewSet` automatically handles List, Retrieve, Create, Update, and Delete actions.
- **Instruction**: We used this to avoid writing 5 separate functions for every single model.

### Overriding Logic (Security)
- **get_queryset()**: 
  - **Logic**: By default, a ViewSet shows *all* data in the DB. We overrode this to filter by `self.request.user`.
  - **Why**: This is the most critical security step. It ensures User A cannot see User B's jobs simply by changing an ID in the URL.
- **perform_create()**:
  - **Logic**: The user is already logged in (we have their token). Instead of making them send their User ID in the POST body, the server "tags" the record with their ID automatically.

---

## 5. Verification & Testing

### The Postman Lifecycle
1. **POST /api/auth/token/**: We tested this first to ensure our "Key" (Token) generation works.
2. **GET /api/applications/ (No Token)**: We verified it returns `401 Unauthorized`.
   - **Why**: This proves our security is actually "on."
3. **GET /api/applications/ (With Token)**: We used the **Bearer Token** header to confirm a `200 OK`.
   - **Result**: Proves the filter correctly identifies "me" from the token.

---

## 6. Frontend "Engine" Logic

### Axios Instance & Interceptors
- **The "Gatekeeper"**: An interceptor stands in front of every outgoing request.
- **Hint**: Instead of writing code to add the token to *every single* API call in every component, the interceptor does it **once** globally. This makes your code DRY (Don't Repeat Yourself).

### Auth Context (Global State)
- **The Context Logic**: Wrapped the whole app in `AuthProvider`.
- **Instruction**: Added a `useEffect` that checks `localStorage` on page load.
- **Why**: Without this, the second you refresh the page, React "forgets" you were logged in, even if the token is still on the computer. Context + UseEffect makes the login persistent.

---
*This guide captures the logic hints and senior-level decisions we made together to build a professional-grade backend.*
