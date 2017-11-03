from goforward.models import LionQuiz
from goforward.serializers import LionQuizSerializer
from rest_framework import generics
from rest_framework.reverse import reverse
from rest_framework.response import Response

# Create your views here.
class LionQuizList(generics.ListCreateAPIView):
    queryset = LionQuiz.objects.all()
    serializer_class = LionQuizSerializer
    name = 'lionquiz-list'

class LionQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LionQuiz.objects.all()
    serializer_class = LionQuizSerializer
    name = 'lionquiz-detail'

class ApiRoot(generics.GenericAPIView):
    name = 'api-root'
    def get(self, request, *args, **kwargs):
        return Response({
            'lion-quiz-list': reverse(LionQuizList.name, request=request),
            })
