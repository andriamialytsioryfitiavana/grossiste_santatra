from django.db import models

class Filiale(models.Model):
    id_filiale = models.AutoField(primary_key=True)
    nom_filiale = models.CharField(max_length=100)
    code_filiale = models.CharField(max_length=20, unique=True)
    adresse = models.TextField()
    ville = models.CharField(max_length=50)
    pays = models.CharField(max_length=50)
    base_donnee_nom = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nom_filiale} ({self.code_filiale})"
