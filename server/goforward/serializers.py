from rest_framework import serializers
from goforward.models import LionQuiz

class LionQuizSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LionQuiz
        fields = (
            'pk',
            'url',
            'quiz',
            'answer_list')