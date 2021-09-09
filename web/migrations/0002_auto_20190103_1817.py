# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('customer_id', models.CharField(max_length=10)),
                ('customer_name', models.CharField(max_length=10)),
                ('customer_gender', models.CharField(max_length=2)),
                ('customer_cellphone', models.CharField(max_length=10)),
                ('customer_BirDate', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Inventory_of_store',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('quantity', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Inventory_of_warehouse',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('quantity', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('order_id', models.CharField(max_length=10)),
                ('order_date', models.DateTimeField()),
                ('customer_id', models.ForeignKey(to='web.Customer')),
            ],
        ),
        migrations.CreateModel(
            name='Order_detail',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('quantity', models.CharField(max_length=10)),
                ('order_id', models.ForeignKey(to='web.Order')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('product_id', models.CharField(max_length=10)),
                ('product_name', models.CharField(max_length=10)),
                ('product_price', models.CharField(max_length=2)),
                ('customer_cellphone', models.CharField(max_length=10)),
                ('customer_BirDate', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('store_id', models.CharField(max_length=10)),
                ('store_name', models.CharField(max_length=10)),
                ('store_address', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('warehouse_id', models.CharField(max_length=10)),
                ('warehouse_name', models.CharField(max_length=10)),
                ('warehouse_address', models.CharField(max_length=30)),
            ],
        ),
        migrations.AddField(
            model_name='order_detail',
            name='product_id',
            field=models.ForeignKey(to='web.Product'),
        ),
        migrations.AddField(
            model_name='order',
            name='store_id',
            field=models.ForeignKey(to='web.Store'),
        ),
        migrations.AddField(
            model_name='inventory_of_warehouse',
            name='product_id',
            field=models.ForeignKey(to='web.Product'),
        ),
        migrations.AddField(
            model_name='inventory_of_warehouse',
            name='warehouse_id',
            field=models.ForeignKey(to='web.Warehouse'),
        ),
        migrations.AddField(
            model_name='inventory_of_store',
            name='product_id',
            field=models.ForeignKey(to='web.Product'),
        ),
        migrations.AddField(
            model_name='inventory_of_store',
            name='store_id',
            field=models.ForeignKey(to='web.Store'),
        ),
    ]
