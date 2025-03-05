from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import ProfessorNotifications, ReviewerNotifications

def professor_notifications(request):
    if request.method == "GET":
        # get notifications in reverse chronological order
        notifications = ProfessorNotifications.objects.all().order_by("-id")
        return JsonResponse({"notifications": [model_to_dict(n) for n in notifications]})
    return JsonResponse({
        "status": "ERROR",
        "message": "Invalid request method"
    })

def reviewer_notifications(request):
    if request.method == "GET":
        # get notifications in reverse chronological order
        notifications = ReviewerNotifications.objects.all().order_by("-id")
        return JsonResponse({"notifications": [model_to_dict(n) for n in notifications]})
    return JsonResponse({
        "status": "ERROR",
        "message": "Invalid request method"
    })