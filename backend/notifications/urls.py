from django.urls import path

from . import views

urlpatterns = [
    path("professor", views.professor_notifications, name="professor_notifications"),
    path("reviewer", views.reviewer_notifications, name="reviewer_notifications"),
]