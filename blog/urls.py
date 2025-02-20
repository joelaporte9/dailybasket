from django.urls import path
from .views import blog_list, blog_detail, preface, projects, contactme, blogs, gallery, ascii_image

urlpatterns = [
    path('', blog_list, name='blog_list'),
    path('ascii/', ascii_image, name='banner'),  
    path('preface/', preface, name='preface'),
    path('projects/', projects, name='projects'),
    path('gallery/', gallery, name='gallery'),
    path('contactme/', contactme, name='contactme'), 
    path('blog/', blogs, name='blogs'),
    path('<slug:slug>/', blog_detail, name='blog_detail'),
] 

