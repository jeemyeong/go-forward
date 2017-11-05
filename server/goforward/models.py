from django.db import models
from django.contrib.postgres.fields import ArrayField

class LionQuiz(models.Model):
    quiz = models.CharField(max_length=200, unique=True)
    answer_list = models.CharField(max_length=10, blank=True)
    def __str__(self):
        return self.name

class FourQuiz(models.Model):
    quiz = models.CharField(max_length=200, unique=True)
    answer_list = models.CharField(max_length=10, blank=True)
    def __str__(self):
        return self.name

class NineQuiz(models.Model):
    quiz = models.CharField(max_length=200, unique=True)
    answer_list = models.CharField(max_length=10, blank=True)
    def __str__(self):
        return self.name

class RandomQuiz(models.Model):
    quiz = models.CharField(max_length=200, unique=True)
    answer_list = models.CharField(max_length=10, blank=True)
    def __str__(self):
        return self.name
