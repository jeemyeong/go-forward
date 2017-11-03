from django.conf.urls import url
from goforward import views

urlpatterns = [
    url(r'^lion/$',
        views.LionQuizList.as_view(),
        name=views.LionQuizList.name),
    url(r'^lion/(?P<pk>[0-9]+)/$',
        views.LionQuizDetail.as_view(),
        name=views.LionQuizDetail.name),
    url(r'^$',
        views.ApiRoot.as_view(),
        name=views.ApiRoot.name),
]
