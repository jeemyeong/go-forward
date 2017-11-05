from rest_framework import serializers
from goforward.models import LionQuiz, FourQuiz, NineQuiz, RandomQuiz

class LionQuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LionQuiz
        fields = (
            'pk',
            'url',
            'quiz',
            'answer_list')

class FourQuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FourQuiz
        fields = (
            'pk',
            'url',
            'quiz',
            'answer_list')

class NineQuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NineQuiz
        fields = (
            'pk',
            'url',
            'quiz',
            'answer_list')

class RandomQuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RandomQuiz
        fields = (
            'pk',
            'url',
            'quiz',
            'answer_list')