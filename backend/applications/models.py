from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Application(models.Model):
    APPLIED = 'Applied'
    INTERVIEW = 'Interview'
    OFFER = 'Offer'
    REJECTED = 'Rejected'

    STATUS_CHOICES = [
        (APPLIED, 'Applied'),
        (INTERVIEW, 'Interview'),
        (OFFER, 'Offer'),
        (REJECTED, 'Rejected'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    company_name = models.CharField(max_length=255)
    position_title = models.CharField(max_length=255)
    notes = models.TextField(blank=True, null=True)

    job_post_url = models.URLField(blank=True, null=True)
    job_requirements = models.TextField(blank=True, null=True)

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default=APPLIED
    )

    applied_at = models.DateField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.company_name} - {self.position_title}"

class ApplicationFile(models.Model):
    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name="files"
    )

    file = models.FileField(upload_to="application_files/")
    file_type = models.CharField(max_length=50)
    original_filename = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.original_filename

class Review(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reviews"
    )
    rating = models.IntegerField(default=5)  # 1-5 stars
    comment = models.TextField()
    is_public = models.BooleanField(default=False)  # For moderation
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review by {self.user.username} - {self.rating} stars"
