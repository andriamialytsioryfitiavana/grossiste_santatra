from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FilialeViewSet

router = DefaultRouter()
router.register(r'filiales', FilialeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
