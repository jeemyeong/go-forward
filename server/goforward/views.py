from goforward.models import LionQuiz, FourQuiz, NineQuiz, RandomQuiz
from goforward.serializers import LionQuizSerializer, FourQuizSerializer, NineQuizSerializer, RandomQuizSerializer
from rest_framework import generics
from rest_framework.reverse import reverse
from rest_framework.response import Response

class LionQuizList(generics.ListCreateAPIView):
    queryset = LionQuiz.objects.all()
    serializer_class = LionQuizSerializer
    name = 'lionquiz-list'

class LionQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LionQuiz.objects.all()
    serializer_class = LionQuizSerializer
    name = 'lionquiz-detail'

class FourQuizList(generics.ListCreateAPIView):
    queryset = FourQuiz.objects.all()
    serializer_class = FourQuizSerializer
    name = 'fourquiz-list'

class FourQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = FourQuiz.objects.all()
    serializer_class = FourQuizSerializer
    name = 'fourquiz-detail'

class NineQuizList(generics.ListCreateAPIView):
    queryset = NineQuiz.objects.all()
    serializer_class = NineQuizSerializer
    name = 'ninequiz-list'

class NineQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = NineQuiz.objects.all()
    serializer_class = NineQuizSerializer
    name = 'ninequiz-detail'

class RandomQuizList(generics.ListCreateAPIView):
    queryset = RandomQuiz.objects.all()
    serializer_class = RandomQuizSerializer
    name = 'randomquiz-list'

class RandomQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RandomQuiz.objects.all()
    serializer_class = RandomQuizSerializer
    name = 'randomquiz-detail'

class ApiRoot(generics.GenericAPIView):
    name = 'api-root'
    def get(self, request, *args, **kwargs):
        return Response({
            'lion-quiz-list': reverse(LionQuizList.name, request=request),
            'four-quiz-list': reverse(FourQuizList.name, request=request),
            'nine-quiz-list': reverse(NineQuizList.name, request=request),
            'random-quiz-list': reverse(RandomQuizList.name, request=request),
            })
