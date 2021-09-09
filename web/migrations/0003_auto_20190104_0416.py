# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0002_auto_20190103_1817'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='customer_BirDate',
        ),
        migrations.RemoveField(
            model_name='product',
            name='customer_cellphone',
        ),
        migrations.AddField(
            model_name='product',
            name='product_category',
            field=models.CharField(max_length=2, default='襪子'),
        ),
    ]
