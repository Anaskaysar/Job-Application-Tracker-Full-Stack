from rest_framework import viewsets, permissions
from .models import Application, ApplicationFile
from .serializers import ApplicationSerializer, ApplicationFileSerializer

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
