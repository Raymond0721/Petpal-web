from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..serializers import ApplicationSerializer
from rest_framework.generics import (
    GenericAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveAPIView,
)
from ..models import Application
from ..permissions import IsSeeker
from ..paginations import BasePageNumberPagination


class SeekerBaseView(GenericAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsSeeker]


class SeekerApplicationList(SeekerBaseView, ListAPIView):
    """Retrive a list of applications that submitted by the login user"""

    # To implement pagination,
    # add '?page_size=1&page=2' at end of URL (the 2nd page while each page contains 1 obj)
    pagination_class = BasePageNumberPagination

    def get_queryset(self):
        applications = get_list_or_404(Application, seeker=self.request.user)

        # Filter applications by status
        status_param = self.request.query_params.get("status")
        # Varify the status parameter
        if status_param is not None and any(
            status_param in STATUS for STATUS in Application.STATUS_CHOICE
        ):
            applications = get_list_or_404(
                Application.objects.filter(
                    seeker=self.request.user, status=status_param
                )
            )

        return applications


class SeekerApplicationDetial(SeekerBaseView, RetrieveAPIView):
    """Retrive the specific application detail by its id for specific login user"""

    def get_object(self):
        application = get_object_or_404(Application, id=self.kwargs["id"])
        # Need to explicitly check permissions
        self.check_object_permissions(self.request, application)
        return application
