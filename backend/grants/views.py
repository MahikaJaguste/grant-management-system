from django.http import JsonResponse
import json
from .models import GrantApplication, GrantApplicationStatusEnum
from django.forms.models import model_to_dict
from .tasks import handle_grant_application_submission, handle_grant_application_review

def submit(request):
    if request.method == "POST":
        body = json.loads(request.body)
        title = body.get("title")
        description = body.get("description")
        fund_requested = float(body.get("fundRequested"))
        grantApplication = GrantApplication.objects.create(title=title, description=description, fund_requested=fund_requested)
        handle_grant_application_submission.delay(grantApplication.id)
        return JsonResponse({
            "status": "SUCCESS",
            "grant": model_to_dict(grantApplication)
        })
    return JsonResponse({
        "status": "ERROR",
        "message": "Invalid request method"
    })

def list(request):
    if request.method == "GET":
        # get query parameters
        filter_status = request.GET.getlist("status[]")
        grants = []
        if len(filter_status) == 0:
            grants = GrantApplication.objects.all().order_by("-id")
        else:
            grants = GrantApplication.objects.filter(status__in=filter_status).order_by("-id")
        return JsonResponse({"grants": [model_to_dict(grant) for grant in grants]})
    return JsonResponse({
        "status": "ERROR",
        "message": "Invalid request method"
    })

def review(request, id):
    if request.method == "POST":
        body = json.loads(request.body)
        new_status = body.get("status")
        if new_status not in [status.value[0] for status in GrantApplicationStatusEnum]:
            return JsonResponse({
                "status": "ERROR",
                "message": "Invalid status"
            })
        grant = GrantApplication.objects.filter(id=id).first()
        if grant is None or grant.status != GrantApplicationStatusEnum.PENDING.value[0]:
            return JsonResponse({
                "status": "ERROR",
                "message": "Grant not found or not in pending status"
            })
        grant.status = new_status
        grant.save()
        handle_grant_application_review.delay(grant.id)
        return JsonResponse({
            "status": "SUCCESS",
            "grant": model_to_dict(grant)
        })
    return JsonResponse({
        "status": "ERROR",
        "message": "Invalid request method"
    })
