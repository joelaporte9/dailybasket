from django.db import models

class WebsiteBannerImage(models.Model):
    banner = models.ImageField(upload_to="banner/")

    def __str__(self):
        return str(self.banner)

class Post(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(unique=True)
    excerpt = models.CharField(max_length=250, default='SOME STRING')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class UploadedImage(models.Model):
    image = models.ImageField(upload_to="photos/")
    description = models.TextField(null=True, default='no description...')    
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.image)


    