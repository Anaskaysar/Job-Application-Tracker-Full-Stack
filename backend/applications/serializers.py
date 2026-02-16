from rest_framework import serializers
from .models import Application, ApplicationFile, Review


class ApplicationFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationFile
        fields = ['id', 'file', 'file_type', 'original_filename', 'created_at']


class ApplicationSerializer(serializers.ModelSerializer):
    files = ApplicationFileSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['user']

from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from allauth.account.models import EmailAddress
from django.db import transaction

class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(required=False, allow_blank=True)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.first_name = self.validated_data.get('name', '')
        user.save()
        return user

class CustomUserDetailsSerializer(UserDetailsSerializer):
    email_verified = serializers.SerializerMethodField()

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('email_verified',)

    def get_email_verified(self, obj):
        # Check if the user has any verified email address
        return EmailAddress.objects.filter(user=obj, verified=True).exists()

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    display_name = serializers.CharField(source='user.first_name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'username', 'display_name', 'rating', 'comment', 'is_public', 'created_at']
        read_only_fields = ['user', 'is_public']
