from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
import secrets

from .models import Filial
from .serializers import FilialSerializer

class
class FilialViewSet(viewsets.ModelViewSet):
    queryset = Filial.objects.all().order_by('-created_at')
    serializer_class = FilialSerializer
    permission_classes = [AllowAny]  # ajuster en prod

    def create(self, request, *args, **kwargs):
        """
        Si email existe -> régénère un code d'accès, l'envoie par email et renvoie l'objet (200).
        Sinon -> comportement normal de création (201).
        """
        email = request.data.get("email", None)
        if email:
            try:
                existing = Filial.objects.get(email=email)
            except Filial.DoesNotExist:
                existing = None

            if existing:
                # génère code lisible, hache et sauvegarde
                plain_code = secrets.token_urlsafe(12)[:8]
                existing.access_code = make_password(plain_code)
                existing.save(update_fields=["access_code", "updated_at"])

                # envoie email
                subject = "Votre code d'accès - Grossiste Santatra"
                message = (
                    f"Bonjour,\n\n"
                    f"Le code d'accès pour la filiale '{existing.name}' a été régénéré.\n"
                    f"Votre code d'accès : {plain_code}\n\n"
                    f"Conservez ce code en lieu sûr.\n\n"
                    f"Cordialement,\nGrossiste Santatra"
                )
                from_email = getattr(settings, "DEFAULT_FROM_EMAIL", "no-reply@example.com")
                try:
                    send_mail(subject, message, from_email, [email], fail_silently=False)
                except Exception:
                    # ne pas bloquer l'API si l'envoi échoue en dev
                    pass

                serializer = self.get_serializer(existing)
                return Response(serializer.data, status=status.HTTP_200_OK)

        # fallback : création normale (serializer gère génération + envoi si email présent)
        return super().create(request, *args, **kwargs)
