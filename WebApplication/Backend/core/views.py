from django.http import HttpResponse
from .models import *
import json


def JsonResponse(obj):
    return HttpResponse(
        json.dumps(obj, ensure_ascii=False),
        content_type="application/json")


def ListDict(obj):
    return list(map(dict, obj))


def ListJsonResponse(obj):
    return JsonResponse(ListDict(obj))


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
    return JsonResponse([{
        "imagePath": a[0]["dir"] if (a := ListDict(Pictures.objects.filter(question_id=question.id))) else None,
        "hints": [hint.text for hint in Hints.objects.filter(question_id=question.id)],
        "answers": [
            {
                "text": answer.name,
                "correct": answer.is_correct
            } for answer in Answers.objects.filter(question_id=question.id)
        ]
    }
        for question in Questions.objects.filter(marker_id=marker_id)
    ])
