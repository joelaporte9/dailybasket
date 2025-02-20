from PIL import Image, ImageFilter, ImageDraw, ImageFont
from django.shortcuts import get_object_or_404, redirect, render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest, JsonResponse
import math 

from blog.models import UploadedImage
from blog.models import Post
from blog.models import WebsiteBannerImage

def blog_list(request):
    posts = Post.objects.all().order_by("-created_at")
    return render(request, "blog/index.html", {"posts": posts})

def blog_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    return render(request, "blog/detail.html", {"post": post})

def preface(request):
    return render(request, "blog/preface.html")

def projects(request):
    return render(request, "blog/projects.html")

def contactme(request):
    return render(request, "blog/contactme.html")

def blogs(request):
    posts = Post.objects.all().order_by("-created_at")
    return render(request, "blog/blogs.html", {"posts": posts})

def gallery(request):
    photo = UploadedImage.objects.all().order_by("-uploaded_at")
    context = {'photos': photo}
    return render(request, 'blog/gallery.html', context)

def ascii_image(request):
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':            
        #chars = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. "[::-1]
        chars = "#Wo- "
        charArray = list(chars)
        charsLen = len(charArray)
        interval = charsLen / 256
        scaleFactor = 0.3
        charWidth = 8
        charHeight = 18

        def getChars(inputInt):
            return charArray[math.floor(inputInt*interval)]

        textfile = open("output.txt","w")

        imgModel = WebsiteBannerImage.objects.first()
        imgfile = imgModel.banner

        banner_img = Image.open(imgfile)

        width, height = banner_img.size
        banner_img = banner_img.resize((int(scaleFactor*width), int(scaleFactor*height*(charWidth/charHeight))), Image.Resampling.NEAREST)
        width, height = banner_img.size

        pix = banner_img.load()
    
        # #This will create a png of the ascii art
        # outputImg = Image.new('RGB', (charWidth * width, charHeight * height), color=(0,0,0))
        # drawImg = ImageDraw.Draw(outputImg)
        # twidth,theight = outputImg.size
        
        print (width, height)

        for i in range(height):
            for j in range(width):
                r, g, b = pix[j, i]
                h = int(r/3 + g/3 + b/3)
                pix[j,i] = (h, h, h)
                textfile.write(getChars(h))
                # drawImg.text((j*charWidth, i*charHeight), getChars(h), fill=(0,128,0))

            textfile.write('\n')

        f = open("output.txt", "r")

        lines = f.read()
        # lines = lines[:-1]
    
        return HttpResponse(lines, content_type="text/plain")
    return render(request, "blog/index.html")







