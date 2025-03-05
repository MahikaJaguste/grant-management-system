from celery import shared_task
from notifications.models import ReviewerNotifications, ProfessorNotifications
from .models import GrantApplication, GrantApplicationStatusEnum

@shared_task()
def handle_grant_application_submission(grant_application_id):
    print("Handling grant application submission with ID", grant_application_id)
    ReviewerNotifications.objects.create(
        title="New Grant Application!",
        description=f"New grant application with ID {grant_application_id} is pending review."
    )
    
@shared_task()
def handle_grant_application_review(grant_application_id):
    print("Handling grant application review with ID", grant_application_id)
    grant = GrantApplication.objects.get(id=grant_application_id)
    if not grant:
        return
    if grant.status == GrantApplicationStatusEnum.APPROVED.name:
        ProfessorNotifications.objects.create(
            title="Grant Application Approved",
            description=f"Grant application with ID {grant_application_id} has been approved."
        )
    elif grant.status == GrantApplicationStatusEnum.REJECTED.name:
        ProfessorNotifications.objects.create(
            title="Grant Application Rejected",
            description=f"Grant application with ID {grant_application_id} has been rejected."
        )