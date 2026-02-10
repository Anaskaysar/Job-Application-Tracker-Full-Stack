from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Application
import datetime

User = get_user_model()

class ApplicationCreateTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client.force_authenticate(user=self.user)

    def test_create_application_with_empty_url_and_notes(self):
        data = {
            "company_name": "Google",
            "position_title": "Backend Dev",
            "status": "Applied",
            "job_post_url": "",  # Empty string as sent by frontend
            "applied_at": datetime.date.today().isoformat(),
            "notes": ""
        }
        response = self.client.post('/api/applications/', data, format='json')
        if response.status_code == 400:
            print("Reproduced 400 Error (Empty Valid):", response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_application_with_invalid_url(self):
        data = {
            "company_name": "Google",
            "position_title": "Backend Dev",
            "status": "Applied",
            "job_post_url": "invalid-url",
            "applied_at": datetime.date.today().isoformat(),
        }
        response = self.client.post('/api/applications/', data, format='json')
        print("Invalid URL Test Response:", response.status_code)
        if response.status_code == 400:
            print("Validation Errors (Expected):", response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_application_exact_screenshot(self):
        data = {
            "company_name": "Google",
            "position_title": "Backend Dev",
            "status": "Applied",
            "job_post_url": "https://www.google.com/about/careers/applications/app",
            "applied_at": "2026-02-10",
            "notes": "dddd",
            "job_requirements": "Python, Django, React"
        }
        response = self.client.post('/api/applications/', data, format='json')
        if response.status_code == 400:
             print("Reproduced 400 Error (Screenshot):", response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Application.objects.get().job_requirements, "Python, Django, React")

