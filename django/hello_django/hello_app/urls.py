from django.urls import path

from . import views

# URL Configuration
urlpatterns = [
    # e.g. http://localhost:8000/
    path("", views.home, name="home"),
]