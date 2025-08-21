from rest_framework import serializers
from .models import Filiale

class FilialeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filiale
        fields = '__all__'
