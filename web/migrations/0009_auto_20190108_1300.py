# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0008_auto_20190108_1300'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='half_product',
            name='half_product_construct_cost',
        ),
        migrations.RemoveField(
            model_name='half_product',
            name='half_product_holding_cost',
        ),
        migrations.RemoveField(
            model_name='material',
            name='material_holding_cost',
        ),
        migrations.RemoveField(
            model_name='material',
            name='material_ordering_cost',
        ),
    ]
