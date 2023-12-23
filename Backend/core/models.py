from django.db.models import Model
from django.db import models


class Markers(Model):
    marker_name = models.CharField(max_length=256)

    def __str__(self):
        return f"{self.id}: {self.marker_name=}"

    def __iter__(self):
        yield "id", self.id
        yield "marker_name", self.marker_name


class Questions(Model):
    marker = models.ForeignKey(Markers, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.id}: {self.marker=}"

    def __iter__(self):
        yield "id", self.id
        yield "marker", dict(self.marker)


class Hints(Model):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)  # cascade??

    text = models.TextField()

    def __str__(self):
        return f"{self.id}: {self.question=}: {self.text=}"

    def __iter__(self):
        yield "id", self.id
        yield "question_id", self.question.id
        yield "text", self.text


class Pictures(Model):
    question = models.OneToOneField(Questions, null=True, on_delete=models.SET_NULL)

    dir = models.ImageField(upload_to="pictures")

    def __str__(self):
        return f"{self.id}: {self.question=}: {self.dir=}"

    def __iter__(self):
        yield "id", self.id
        yield "question_id", self.question.id
        yield "dir", "/media/" + self.dir.name


class Answers(Model):
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)  # cascade??

    name = models.CharField(max_length=256)
    author = models.CharField(max_length=256)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}: {self.question=}: {self.name=} {self.author=} {self.is_correct=}"

    def __iter__(self):
        yield "id", self.id
        yield "question_id", self.question.id
        yield "name", self.name
        yield "author", self.author
        yield "is_correct", self.is_correct
