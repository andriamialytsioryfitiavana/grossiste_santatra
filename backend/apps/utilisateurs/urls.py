# apps/utilisateurs/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Exemple de route
    path('', views.home, name='home'),
]
