# AWS EC2 Deployment Guide: Lean Version

Follow these steps to deploy the Django backend on a single t3.micro/small instance to maximize AWS credits.

## 1. Instance Setup
- **OS**: Ubuntu 22.04 LTS
- **Instance Type**: t3.micro (Eligible for Free Tier / Cheap on Credits)
- **Security Groups**: Allow 22 (SSH), 80 (HTTP), 443 (HTTPS), and 5432 (PostgreSQL - only if needed externally, default is local).

## 2. Server Environment
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv nginx postgresql postgresql-contrib libpq-dev curl -y
```

## 3. Database Setup (Local)
```bash
sudo -u postgres psql
# CREATE DATABASE jobtracker;
# CREATE USER jobuser WITH PASSWORD 'yourpassword';
# GRANT ALL PRIVILEGES ON DATABASE jobtracker TO jobuser;
```

## 4. Application Configuration
- Clone the repository.
- Create a `.env` file with production settings.
- Install requirements: `pip install -r requirements.txt gunicorn psycopg2-binary whitenoise`.
- Run migrations: `python manage.py migrate`.
- Collect static files: `python manage.py collectstatic`.

## 5. Process Management (Gunicorn + Systemd)
Create `/etc/systemd/system/gunicorn.service`:
```ini
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/JobApp/backend
ExecStart=/home/ubuntu/JobApp/backend/venv/bin/gunicorn \
          --access-logfile - \
          --workers 3 \
          --bind unix:/run/gunicorn.sock \
          backend.wsgi:application
```

## 6. Web Server (Nginx)
Create `/etc/nginx/sites-available/jobtracker`:
```nginx
server {
    listen 80;
    server_name api.jobtracker.kaysarulanas.me;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        alias /home/ubuntu/Job-Application-Tracker-Full-Stack/backend/staticfiles/;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/run/gunicorn.sock;
    }
}
```

## 7. SSL (Certbot)
```bash
sudo apt install python3-certbot-nginx
sudo certbot --nginx -d api.jobtracker.kaysarulanas.me
```

## 8. Google OAuth Setup
- **Authorized JavaScript Origins**: Add `https://jobtracker.kaysarulanas.me`.
- **Authorized Redirect URIs**: Add `https://jobtracker.kaysarulanas.me` and `https://api.jobtracker.kaysarulanas.me`.
- **Environment Variable**: Ensure `GOOGLE_CLIENT_SECRET=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` and `GOOGLE_CALLBACK_URL=https://jobtracker.kaysarulanas.me` are set in your EC2 `.env` file.

## 🔄 How to Update the Backend
1. **Push** local changes to GitHub.
2. **SSH** into EC2.
3. **Pull** latest code: `git pull origin main`.
4. **Restart** services: `sudo systemctl restart gunicorn`.
5. **Migrate** if needed: `python manage.py migrate`.

