from django.db import models
from enum import Enum

class GrantApplicationStatusEnum(Enum):
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',

class GrantApplication(models.Model):
    title = models.CharField(max_length=100)
    abstract = models.TextField()
    objectives = models.TextField()
    research_question = models.TextField()
    background = models.TextField()
    plan = models.TextField()
    dissemination = models.TextField()
    cv = models.TextField()
    budget = models.TextField()
    budget_justification = models.TextField()
    non_academic_dissemination = models.TextField()
    project_management = models.TextField()
    appendices = models.TextField()
    ethics = models.TextField()
    data_management_plan = models.TextField()
    status = models.CharField(max_length=10, choices=[(status.name, status.name) for status in GrantApplicationStatusEnum], default=GrantApplicationStatusEnum.PENDING.name)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)