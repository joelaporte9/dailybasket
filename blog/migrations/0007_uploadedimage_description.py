# Generated by Django 5.1.5 on 2025-02-13 02:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_alter_uploadedimage_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadedimage',
            name='description',
            field=models.TextField(null=True),
        ),
    ]
