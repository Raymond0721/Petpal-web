from django.contrib import admin
from .models import Application


# Register your models here.
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("id", "petpost", "seeker", "last_updated", "status")


admin.site.register(Application, ApplicationAdmin)
