from django.contrib import admin
from .models import Post, UploadedImage, WebsiteBannerImage

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(UploadedImage)
class ImgAdmin(admin.ModelAdmin):
    list_display = ('image', 'uploaded_at')

@admin.register(WebsiteBannerImage)
class BannerAdmin(admin.ModelAdmin):
    Banner_display = ('banner')



