from django.core.management.base import BaseCommand
from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site
import os

class Command(BaseCommand):
    help = 'Sets up Google OAuth SocialApp based on environment variables'

    def handle(self, *args, **options):
        client_id = os.environ.get('GOOGLE_CLIENT_ID')
        secret = os.environ.get('GOOGLE_CLIENT_SECRET')
        
        if not client_id or not secret:
            self.stdout.write(self.style.ERROR('GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not found in environment'))
            return

        # Ensure Site exists
        site, created = Site.objects.get_or_create(id=1, defaults={'domain': 'localhost:5173', 'name': 'JobTracker'})
        
        # In production, you might want to update the domain based on another env var, 
        # but for now we ensure at least one site exists.
        
        self.stdout.write(f'Using Site: {site.domain}')

        # Create or Update SocialApp
        app, created = SocialApp.objects.get_or_create(
            provider='google',
            defaults={
                'name': 'Google',
                'client_id': client_id,
                'secret': secret,
            }
        )
        
        if not created:
            app.client_id = client_id
            app.secret = secret
            app.save()
            self.stdout.write(self.style.SUCCESS('Updated existing Google SocialApp'))
        else:
            self.stdout.write(self.style.SUCCESS('Created new Google SocialApp'))

        app.sites.add(site)
        self.stdout.write(self.style.SUCCESS('Linked SocialApp to Site'))
