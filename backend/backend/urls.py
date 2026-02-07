from django.contrib import admin
from django.urls import path, include  # Added include here
from rest_framework import routers
from applications.views import ApplicationViewSet, ApplicationFileViewSet
from applications.views import GoogleLogin

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
    
    # Auth Endpoints
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/auth/google/', GoogleLogin.as_view(), name='google_login'),
]