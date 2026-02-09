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

class ReviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    display_name = serializers.CharField(source='user.first_name', read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'username', 'display_name', 'rating', 'comment', 'is_public', 'created_at']
        read_only_fields = ['user', 'is_public']
