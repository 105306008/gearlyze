"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from web.views import hello_world, index, search, article, tutorial, explain
from web.views import index_three
from web.views import search_ajax
from web.views import article_ajax
#from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^hello/$', hello_world),
    url(r'^$', index),
    url(r'^search/$', search),
    url(r'^article/$', article),
    url(r'^tutorial/$', tutorial),
    url(r'^explain/$', explain),
    url(r'^index_three/$', index_three),
    url(r'^search_ajax/$', search_ajax, name='search_ajax'),
    url(r'^article_ajax/$', article_ajax, name='article_ajax'),
] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)

#设置静态文件路径
#urlpatterns += staticfiles_urlpatterns()