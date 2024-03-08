from django.urls import path

from . import views

# URL Configuration
urlpatterns = [
    # e.g. http://localhost:8000/
    path("", views.home, name="home"),
    # e.g. http://localhost:8000/headers
    path("headers", views.headers, name="headers"),
    # e.g. http://localhost:8000/data
    path("data", views.data, name="data"),
]