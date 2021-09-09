# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0003_auto_20190104_0416'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventory_of_store',
            name='product_id',
        ),
        migrations.RemoveField(
            model_name='inventory_of_store',
            name='store_id',
        ),
        migrations.RemoveField(
            model_name='inventory_of_warehouse',
            name='product_id',
        ),
        migrations.RemoveField(
            model_name='inventory_of_warehouse',
            name='warehouse_id',
        ),
        migrations.RemoveField(
            model_name='order',
            name='customer_id',
        ),
        migrations.RemoveField(
            model_name='order',
            name='store_id',
        ),
        migrations.RemoveField(
            model_name='order_detail',
            name='order_id',
        ),
        migrations.RemoveField(
            model_name='order_detail',
            name='product_id',
        ),
        migrations.DeleteModel(
            name='Post',
        ),
        migrations.DeleteModel(
            name='Customer',
        ),
        migrations.DeleteModel(
            name='Inventory_of_store',
        ),
        migrations.DeleteModel(
            name='Inventory_of_warehouse',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='Order_detail',
        ),
        migrations.DeleteModel(
            name='Product',
        ),
        migrations.DeleteModel(
            name='Store',
        ),
        migrations.DeleteModel(
            name='Warehouse',
        ),
    ]
