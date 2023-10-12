from django.urls import path
from . import views 

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserProfileList.as_view(), name='user'),
 	path('user/<int:pk>/', views.UserProfileUpdate.as_view(), name='user-update'),
]