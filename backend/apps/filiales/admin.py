from django.contrib import admin
from .models import Filial


@admin.register(Filial)
class FilialAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'city', 'country', 'created_at')
    search_fields = ('name', 'email', 'city', 'country')
    readonly_fields = ('created_at', 'updated_at')
