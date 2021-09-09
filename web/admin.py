from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import Brand
from .models import Article
from .models import Search
# Register your models here.


admin.site.register(Brand)
admin.site.register(Article)
admin.site.register(Search)