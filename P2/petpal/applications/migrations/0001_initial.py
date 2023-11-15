# Generated by Django 4.2.7 on 2023-11-15 05:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pets', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('denied', 'Denied'), ('withdrawn', 'Withdrawn')], default='pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('adopter_firstname', models.CharField(max_length=255)),
                ('adopter_lastname', models.CharField(max_length=255)),
                ('adopter_email', models.EmailField(max_length=254)),
                ('co_adopter_firstname', models.CharField(blank=True, max_length=255, null=True)),
                ('co_adopter_lastname', models.CharField(blank=True, max_length=255, null=True)),
                ('co_adopter_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('addr_street', models.CharField(max_length=255, verbose_name='street')),
                ('addr_city', models.CharField(max_length=255, verbose_name='city')),
                ('addr_province', models.CharField(max_length=10, verbose_name='province')),
                ('addr_postal', models.CharField(max_length=10, verbose_name='postal')),
                ('phone', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('phone_type', models.CharField(choices=[('cell', 'Cell'), ('home', 'Home')], max_length=10)),
                ('have_pet_currently', models.BooleanField(verbose_name='Currently have any pets?')),
                ('have_pet_notes', models.TextField(blank=True, null=True, verbose_name='Please list your current pets')),
                ('family_members', models.TextField(verbose_name='Names and ages of all permanent residents of your home (adults/children)')),
                ('petpost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pets.petpost')),
                ('seeker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seekers', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-last_updated',),
            },
        ),
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('content', models.CharField(max_length=255)),
                ('application', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='conversations', to='applications.application')),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
