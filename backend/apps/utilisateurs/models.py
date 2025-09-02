from django.db import models

class Utilisateur(models.Model):
    ROLES = (
        ('admin', 'Admin'),
        ('vendeur', 'Vendeur'),
        ('comptable', 'Comptable'),
    )

    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    mot_de_passe = models.CharField(max_length=255)  # sera hashé avec Django
    role = models.CharField(max_length=30, choices=ROLES)
    # Utiliser une référence en string pour éviter l'import circulaire
    filiale = models.ForeignKey('filiales.Filial', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.nom} {self.prenom} ({self.role})"
