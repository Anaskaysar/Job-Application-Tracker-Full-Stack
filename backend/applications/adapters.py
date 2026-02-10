from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.contrib.auth import get_user_model
import re

User = get_user_model()

class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):
    def populate_user(self, request, sociallogin, data):
        """
        Hook into the user creation process to auto-generate a username.
        """
        user = super().populate_user(request, sociallogin, data)
        
        # If username is already set or if we don't have an email, skip custom logic
        email = data.get('email')
        if not email:
            return user

        # 1. Generate username from email handle
        # Example: kaysarul.anas@gmail.com -> kaysarul
        # (user requested first half, often split by dots or underscores)
        handle = email.split('@')[0]
        # Clean handle: take only the first part before any common separators if requested, 
        # or just the whole thing up to the @. 
        # User example: kaysarul.anas -> kaysarul
        # I'll split by common separators and take the first part.
        base_username = re.split(r'[._-]', handle)[0]
        
        # 2. Check for collisions and increment
        username = base_username
        counter = 1
        
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
            
        user.username = username
        
        # Also populate first_name from the 'name' field if provided by the social account
        full_name = data.get('name') or data.get('first_name')
        if full_name:
            user.first_name = full_name

        return user
