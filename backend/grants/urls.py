from django.urls import path

from . import views

urlpatterns = [
    path("submit", views.submit, name="submit"),
    path("list", views.list, name="list"),
    path("review/<int:id>", views.review, name="review"),
]