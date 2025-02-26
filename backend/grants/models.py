from django.db import models
from enum import Enum

class GrantApplicationStatusEnum(Enum):
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',


class GrantApplication(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    fund_requested = models.FloatField()
    status = models.CharField(max_length=10, choices=[(status.name, status.name) for status in GrantApplicationStatusEnum], default=GrantApplicationStatusEnum.PENDING.name)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)