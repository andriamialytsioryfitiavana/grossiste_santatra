# -*- coding: utf-8 -*-
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Clé secrète (remplacer en production via variable d'environnement)
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'change-me-in-prod')

# DEBUG activé pour le développement
DEBUG = True

# Hosts autorisés (pour le développement, localhost suffit)
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

# Applications installées
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'apps.filiales',
    'apps.utilisateurs',
]

# Configuration de la base de données (configurée en dur pour le développement)
# Hypothèses : Laragon/MySQL local, utilisateur 'root' sans mot de passe, base 'grossiste_santatra'.
# Modifiez les valeurs ci-dessous si votre configuration differe.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'grossiste_santatra',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}

# NOTE: Si vous preferez utiliser des variables d'environnement ou SQLite en dev, dites-le et
# je peux restaurer la logique dynamique qui lit DJANGO_DB_* ou DJANGO_USE_SQLITE.

# Middleware par défaut
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URL principale du projet
ROOT_URLCONF = 'grossiste.urls'

# Templates (par défaut)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI et ASGI
WSGI_APPLICATION = 'grossiste.wsgi.application'
ASGI_APPLICATION = 'grossiste.asgi.application'

# Mot de passe par défaut
AUTH_PASSWORD_VALIDATORS = []

# Langue et fuseau horaire
LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Africa/Antananarivo'
USE_I18N = True
USE_TZ = True

# URL pour fichiers statiques
STATIC_URL = 'static/'
# Dossier de collecte pour collectstatic
STATIC_ROOT = BASE_DIR / 'staticfiles'
# Dossiers supplémentaires en dev (si présents)
STATICFILES_DIRS = [BASE_DIR / 'static']

# Configuration REST framework minimale
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

