# Authentication Integration Guide: Full-Stack Journey

This document outlines the complete implementation of the authentication system for the Job Tracker application, including the challenges faced and the final professional architecture.

## 1. Initial Setup & Architecture

The goal was to connect a **React (Vite) Frontend** to a **Django REST Framework Backend** with support for both standard Email/Password and Google OAuth.

### Backend Tech Stack:
- `dj-rest-auth`: Handles authentication endpoints (/login, /registration, etc.).
- `django-allauth`: Manages social authentication and account logic.
- `rest_framework_simplejwt`: Issues and verifies JSON Web Tokens.

### Frontend Tech Stack:
- `@react-oauth/google`: Integrated Google Login flow.
- `Axios`: Centralized API client with security interceptors.
- `Context API`: Global authentication state management.

---

## 2. Troubleshooting & Error Resolution

During the integration "handshake," we encountered several critical hurdles. Here is how we solved them:

### Phase 1: Registration Failures (400 Bad Request)
- **The Error**: The backend rejected registration attempts even with valid data.
- **Discovery**: `dj-rest-auth` registration requires a confirmation password.
- **The Fix**: Updated the payload in `SignupPage.jsx` to send `password1` and `password2` (duplicates of the same password).

### Phase 2: Google OAuth Handshake (500 Error)
- **The Error**: Clicking Google Login caused a backend crash (500).
- **Discovery**: Django's "Sites" framework was misconfigured.
- **The Fix**: 
  - Adjusted `SITE_ID = 2` in `settings.py` to match the database.
  - Linked the "Social Application" to the correct site in Django Admin.

### Phase 3: The 401 Unauthorized Loop
- **The Error**: Users were logged in, but the app immediately redirected them back to Login.
- **Discovery**: The Axios Interceptor was attaching "Expired/Invalid" tokens to the Login/Registration requests themselves, causing the backend to reject them.
- **The Fix**: Updated `axios.js` to ignore authentication endpoints during token attachment.

### Phase 4: Token Key Mismatch
- **The Error**: The app successfully logged in but didn't know who the user was.
- **Discovery**: The backend was sending a `key` (Standard Token), but the frontend was looking for `access` (JWT).
- **The Fix**: Hardened `AuthContext.jsx` and `axios.js` to support BOTH formats automatically.

### Phase 5: Production Security (COOP & CSRF)
- **The Error**: Google Login blocked by browser in production; Admin panel rejected logins.
- **Discovery**: 
  - `Cross-Origin-Opener-Policy` (COOP) headers were preventing the Google popup from talking to the main site.
  - `CSRF_TRUSTED_ORIGINS` was missing the API's own domain, blocking admin logins.
- **The Fix**:
  - Set `SECURE_CROSS_ORIGIN_OPENER_POLICY = None` (default) to allow OAuth popups.
  - Added `https://api.jobtracker.kaysarulanas.me` to `CSRF_TRUSTED_ORIGINS`.

---

## 3. Final Security & Best Practices

To ensure the app is production-ready, we implemented the following:

- **Environment Variables**: Moved all secrets (Google Client ID, Secret Keys, API URLs) into `.env` files.
- **Safe Version Control**: Created a robust `.gitignore` to prevent sensitive credentials from ever being uploaded to GitHub.
- **Private Routing**: Implemented a `PrivateRoute` component that prevents unauthenticated users from accessing the Dashboard.

## 4. How the "Handshake" Works Now

1. **Login**: User submits credentials.
2. **Token Detection**: Frontend receives a token and automatically detects if it's a JWT (Bearer) or a Standard Token.
3. **Profile Fetch**: Frontend immediately fetches the user's real profile from `/api/auth/user/`.
4. **Redirection**: Once the user is identified, they are zoomed into `/dashboard`.

---
*Last Updated: February 2026*
