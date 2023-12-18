from django.http import HttpResponse
from .models import Markers, Questions, Hints, Pictures, Answers
import json


def JsonResponse(obj):
    return HttpResponse(
        json.dumps(obj, ensure_ascii=False),
        content_type="application/json")


def ListJsonResponse(obj):
    return JsonResponse(list(map(dict, obj)))


def test(request):
    return HttpResponse("abas")


def GetMarkers(request):
    return ListJsonResponse(Markers.objects.all())


def GetQuestions(request, marker_id):
    return ListJsonResponse(Questions.objects.filter(marker_id=marker_id))


def GetHints(request, question_id):
    return ListJsonResponse(Hints.objects.filter(question_id=question_id))


def GetPictures(request, question_id):
    return ListJsonResponse(Pictures.objects.filter(question_id=question_id))


def GetAnswers(request, question_id):
    return ListJsonResponse(Answers.objects.filter(question_id=question_id))
