from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Filial

class FilialSerializer(serializers.ModelSerializer):
    access_code = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Filial
        fields = ['id', 'name', 'email', 'address', 'city', 'country', 'access_code', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        code = validated_data.pop('access_code', '')
        if code:
            validated_data['access_code'] = make_password(code)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        code = validated_data.pop('access_code', None)
        if code:
            instance.access_code = make_password(code)
        return super().update(instance, validated_data)
