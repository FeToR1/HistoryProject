from django.http import HttpResponse
from .models import Markers, Questions, Hints, Pictures, Answers
import json


def JsonResponse(obj):
    return HttpResponse(
        json.dumps(obj, ensure_ascii=False),
        content_type="application/json")


def ListJson(obj):
    return list(map(dict, obj))


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


def GetQuestionsByMarker(request, marker_id):
    questions_id = list(map(lambda x: x["id"], ListJson(Questions.objects.filter(marker_id=marker_id))))
    questions = list(map(lambda x: dict(x), Questions.objects.filter(marker_id=marker_id)))
    for i in range(len(questions)):
        questions[i]["hints"] = ListJson(Hints.objects.filter(question_id=questions_id[i]))
        questions[i]["answers"] = ListJson(Answers.objects.filter(question_id=questions_id[i]))
        questions[i]["pictures"] = ListJson(Pictures.objects.filter(question_id=questions_id[i]))
    return JsonResponse(questions)
