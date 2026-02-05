from rest_framework import serializers
from .models import Application, ApplicationFile


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
