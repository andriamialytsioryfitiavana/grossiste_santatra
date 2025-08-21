from rest_framework import viewsets
from .models import Filiale
from .serializers import FilialeSerializer

class FilialeViewSet(viewsets.ModelViewSet):
    queryset = Filiale.objects.all()
    serializer_class = FilialeSerializer
