from rest_framework import viewsets, permissions
from .models import Application, ApplicationFile, Review
from .serializers import ApplicationSerializer, ApplicationFileSerializer, ReviewSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return applications belonging to the current user
        return self.request.user.applications.all()

    def perform_create(self, serializer):
        # Automatically set the user to the current logged-in user
        serializer.save(user=self.request.user)

class ApplicationFileViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return files belonging to the current user's applications
        return ApplicationFile.objects.filter(application__user=self.request.user)

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = os.getenv("GOOGLE_CALLBACK_URL", "http://localhost:5173")
    client_class = OAuth2Client

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    
    def get_permissions(self):
        if self.action == 'list':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        if self.action == 'list':
            return Review.objects.filter(is_public=True).order_by('-created_at')
        return Review.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)