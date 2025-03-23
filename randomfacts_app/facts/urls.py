from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_random_fact, name="random_fact"),
    path("<int:fact_id>/like/", views.like_fact, name="like_fact"),
    path("<int:fact_id>/dislike/", views.dislike_fact, name="dislike_fact"),
    path("<int:fact_id>/comment/", views.add_comment, name="add_comment"),

    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('facts/<int:fact_id>/', views.view_fact_view, name='view_fact'),
]
