from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse


def root(request):
    return HttpResponse('API root — available endpoints: /api/filiales/ and /api/utilisateurs/')


urlpatterns = [
    path('', root, name='root'),
    path('admin/', admin.site.urls),
    path('api/filiales/', include('apps.filiales.urls')),
    path('api/utilisateurs/', include('apps.utilisateurs.urls')),
]
