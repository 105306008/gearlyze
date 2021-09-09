# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0005_auto_20190106_2348'),
    ]

    operations = [
        migrations.AddField(
            model_name='half_product',
            name='half_product_construct_cost',
            field=models.CharField(max_length=2, default='20'),
        ),
        migrations.AddField(
            model_name='half_product',
            name='half_product_holding_cost',
            field=models.CharField(max_length=2, default='15'),
        ),
        migrations.AddField(
            model_name='material',
            name='material_holding_cost',
            field=models.CharField(max_length=2, default='10'),
        ),
        migrations.AddField(
            model_name='material',
            name='material_ordering_cost',
            field=models.CharField(max_length=2, default='15'),
        ),
    ]
