from django.contrib import admin
from django.urls import path, include  # Added include here
from rest_framework import routers
from applications.views import ApplicationViewSet, ApplicationFileViewSet

#  JWT Authentication
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
) 

router = routers.DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')
router.register(r'files', ApplicationFileViewSet, basename='file')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]