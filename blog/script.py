from blog.models import UploadedImage
from PIL import Image, ImageFilter, ImageDraw, ImageFont
import math

def convert_to_ascii():
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

    Photos = Image.open("WebsitebannerEdited.jpg")
    #Photos = Image.open(UploadedImage.objects.all())
    fnt = ImageFont.truetype("UAV-OSD-Mono.ttf", 15)

    width, height = Photos.size
    Photos = Photos.resize((int(scaleFactor*width), int(scaleFactor*height*(charWidth/charHeight))), Image.Resampling.NEAREST)
    width, height = Photos.size

    pix = Photos.load()

    outputImg = Image.new('RGB', (charWidth * width, charHeight * height), color=(0,0,0))
    drawImg = ImageDraw.Draw(outputImg)

    twidth,theight = outputImg.size


    print (width, height)

    for i in range(height):
        for j in range(width):
            r, g, b = pix[j, i]
            h = int(r/3 + g/3 + b/3)
            pix[j,i] = (h, h, h)
            textfile.write(getChars(h))
            drawImg.text((j*charWidth, i*charHeight), getChars(h), font=fnt, fill=(0,128,0))

        textfile.write('\n')

    return(outputImg.save("output.png"))