from django.contrib import admin
from .models import Filiale


@admin.register(Filiale)
class FilialeAdmin(admin.ModelAdmin):
    list_display = ('id_filiale', 'nom_filiale', 'code_filiale', 'ville', 'pays')
    search_fields = ('nom_filiale', 'code_filiale', 'ville')
