# apps/utilisateurs/views.py
from django.http import HttpResponse

def home(request):
    return HttpResponse("Page utilisateurs")
