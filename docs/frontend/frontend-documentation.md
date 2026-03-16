# Frontend Documentation: JobTrackerr-FullStack-React-Django

This document provides a comprehensive guide to understanding, setting up, and developing the frontend for the JobTrackerr-FullStack-React-Django.

## 🚀 Project Overview
A modern, responsive React application built with Vite and styled using Tailwind CSS v4. It integrates with a Django REST Framework backend using JWT authentication.

---

## 🛠 Tech Stack
- **Framework**: [React](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **State Management**: React Context API

---

## 📂 Project Structure
```text
frontend/
├── src/
│   ├── api/            # Axios instance and interceptors
│   ├── components/     # Reusable UI components
│   ├── context/        # Auth and other global contexts
│   ├── pages/          # Full-page components (Login, Dashboard, etc.)
│   ├── styles/         # Global CSS and Tailwind configuration
│   ├── App.jsx         # Main application routing
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

---

## 🔐 Authentication & Security

### AuthContext (`src/context/AuthContext.jsx`)
Handles user login, logout, and persistent sessions.
- **Provider**: Wraps the entire application in `main.jsx`.
- **Hook**: Use `useAuth()` to access `user`, `login`, and `logout`.
- **Persistence**: Stores `access_token` and `refresh_token` in `localStorage`.

### API Client (`src/api/axios.js`)
A pre-configured Axios instance that automatically attaches JWT tokens to requests.
- **Base URL**: `http://127.0.0.1:8000/`
- **Request Interceptor**: Automatically adds `Authorization: Bearer <token>` to all outgoing requests if the token exists.

---

## 📡 API Endpoints

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/auth/token/` | `POST` | Get access/refresh tokens | No |
| `/api/auth/token/refresh/` | `POST` | Refresh access token | No |
| `/api/applications/` | `GET/POST` | List/Create applications | Yes |
| `/api/applications/:id/` | `GET/PUT/DELETE` | Handle specific application | Yes |
| `/api/files/` | `GET/POST` | List/Upload application files | Yes |

---

## 🎨 Styling with Tailwind CSS v4
The project uses the latest Tailwind v4 pipeline.
- **Global Styles**: Defined in `src/index.css`.
- **Usage**: Use utility classes directly in your components (e.g., `<div className="bg-blue-500 p-4">`).
- **Customization**: Update `index.css` for theme variables and configuration.

---

## 🚦 Getting Started

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 💡 Development Tips
- **Private Routes**: Use the `PrivateRoute` component in `App.jsx` to protect pages that require authentication.
- **Hooks**: Prefer functional components and hooks (`useState`, `useEffect`, `useContext`) for logic and state.
- **Services**: For complex logic, create a `src/services` directory to separate API calls from component code.
