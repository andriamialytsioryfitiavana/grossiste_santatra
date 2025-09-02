from django.urls import include, path
from rest_framework import routers
from .views import FilialViewSet

router = routers.DefaultRouter()
router.register(r'filiales', FilialViewSet, basename='filiale')

urlpatterns = [
    path('api/', include(router.urls)),
]
