from django.http import JsonResponse
import json
from .models import GrantApplication, GrantApplicationStatusEnum
from django.forms.models import model_to_dict
from .tasks import handle_grant_application_submission, handle_grant_application_review

def submit(request):
    if request.method == "POST":
        body = json.loads(request.body)
        title = body.get("title")
        abstract = body.get("abstract")
        objectives = body.get("objectives")
        research_question = body.get("researchQuestion")
        background = body.get("background")
        plan = body.get("plan")
        dissemination = body.get("dissemination")
        cv = body.get("cv")
        budget = body.get("budget")
        budget_justification = body.get("budgetJustification")
        non_academic_dissemination = body.get("nonAcademicDissemination")
        project_management = body.get("projectManagement")
        appendices = body.get("appendices")
        ethics = body.get("ethics")
        data_management_plan = body.get("dataManagementPlan")
        grantApplication = GrantApplication.objects.create(
            title=title,
            abstract=abstract,
            objectives=objectives,
            research_question=research_question,
            background=background,
            plan=plan,
            dissemination=dissemination,
            cv=cv,
            budget=budget,
            budget_justification=budget_justification,
            non_academic_dissemination=non_academic_dissemination,
            project_management=project_management,
            appendices=appendices,
            ethics=ethics,
            data_management_plan=data_management_plan,
        )
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
