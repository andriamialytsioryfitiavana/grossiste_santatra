# -*- coding: utf-8 -*-
import os
from pathlib import Path

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
    # enable CORS for frontend dev
    'corsheaders',
    'apps.filiales',
    'apps.utilisateurs',
]

# Configuration de la base de données : utiliser des variables d'environnement, revenir aux valeurs par défaut de MySQL, option dev pour utiliser SQLite
USE_SQLITE = os.environ.get("DJANGO_USE_SQLITE", "0") == "1"
DB_ENGINE = os.environ.get("DJANGO_DB_ENGINE", "django.db.backends.mysql")

# Si utilisation de MySQL, essayer de s'assurer qu'un pilote DB-API est disponible (fallback pymysql)
if DB_ENGINE == "django.db.backends.mysql":
    try:
        import MySQLdb  # noqa: F401
    except Exception:
        try:
            import pymysql
            pymysql.install_as_MySQLdb()
        except Exception:
            pass

if USE_SQLITE:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": DB_ENGINE,
            "NAME": os.environ.get("DJANGO_DB_NAME", "grossiste_santatra"),
            "USER": os.environ.get("DJANGO_DB_USER", "root"),
            "PASSWORD": os.environ.get("DJANGO_DB_PASSWORD", ""),
            "HOST": os.environ.get("DJANGO_DB_HOST", "127.0.0.1"),
            "PORT": os.environ.get("DJANGO_DB_PORT", "3306"),
            "OPTIONS": {"charset": "utf8mb4"},
        }
    }

# Middleware par défaut
MIDDLEWARE = [
    # corsheaders must come before CommonMiddleware
    'corsheaders.middleware.CorsMiddleware',
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

# après REST_FRAMEWORK ou en bas du fichier — développement seulement
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
# pour debug rapide (dev only) : autoriser tout (supprimez en prod)
# CORS_ALLOW_ALL_ORIGINS = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Email (développement: affichage dans la console)
EMAIL_BACKEND = os.environ.get("DJANGO_EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend")
DEFAULT_FROM_EMAIL = os.environ.get("DJANGO_DEFAULT_FROM", "no-reply@grossiste.local")

# Exemple pour SMTP (mettre en variables d'environnement en production)
# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# EMAIL_HOST = os.environ.get("DJANGO_EMAIL_HOST", "smtp.example.com")
# EMAIL_PORT = int(os.environ.get("DJANGO_EMAIL_PORT", 587))
# EMAIL_HOST_USER = os.environ.get("DJANGO_EMAIL_USER", "")
# EMAIL_HOST_PASSWORD = os.environ.get("DJANGO_EMAIL_PASSWORD", "")
# EMAIL_USE_TLS = os.environ.get("DJANGO_EMAIL_USE_TLS", "1") == "1"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

