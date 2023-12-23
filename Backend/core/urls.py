from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.test, name="abas"),
    path('markers/', views.GetMarkers, name='markers'),
    path('questions/<int:marker_id>/', views.GetQuestions, name='questions'),
    path('hints/<int:question_id>/', views.GetHints, name='hints'),
    path('pictures/<int:question_id>/', views.GetPictures, name='pictures'),
    path('answers/<int:question_id>/', views.GetAnswers, name='answers'),
    path('questions_by_marker/<int:marker_id>/', views.GetQuestionsByMarker, name='questions_by_marker'),
]
