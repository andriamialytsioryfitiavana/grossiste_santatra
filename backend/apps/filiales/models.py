from django.db import models

class Filial(models.Model):
    name = models.CharField("Nom", max_length=180)
    email = models.EmailField("Email", blank=True, null=True)
    address = models.CharField("Adresse", max_length=250, blank=True)
    city = models.CharField("Ville", max_length=120, blank=True)
    country = models.CharField("Pays", max_length=120, blank=True)
    access_code = models.CharField("Code d'accès (haché)", max_length=128, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Filiale"
        verbose_name_plural = "Filiales"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
