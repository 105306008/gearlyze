# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0004_auto_20190106_2339'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customer_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('customer_name', models.CharField(max_length=10)),
                ('customer_gender', models.CharField(max_length=2)),
                ('customer_cellphone', models.CharField(max_length=10)),
                ('customer_BirDate', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Half_product',
            fields=[
                ('half_product_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('half_product_name', models.CharField(max_length=10)),
                ('half_product_quantity', models.CharField(max_length=10)),
                ('half_product_producing_time', models.CharField(max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Inventory_of_store',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('inventory_quantity', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Manufacturing_record',
            fields=[
                ('manufacturing_record_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('manufacturing_record_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Manufacturing_record_detail',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('manufacturing_quantity', models.CharField(max_length=10)),
                ('half_product_id', models.ForeignKey(to='web.Half_product')),
                ('manufacturing_record_id', models.ForeignKey(to='web.Manufacturing_record')),
            ],
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('material_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('material_name', models.CharField(max_length=10)),
                ('material_quantity', models.CharField(max_length=10)),
                ('material_producing_time', models.CharField(max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('order_date', models.DateTimeField()),
                ('customer_id', models.ForeignKey(to='web.Customer')),
            ],
        ),
        migrations.CreateModel(
            name='Order_detail',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('order_quantity', models.CharField(max_length=10)),
                ('order_id', models.ForeignKey(to='web.Order')),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('product_name', models.CharField(max_length=10)),
                ('product_price', models.CharField(max_length=10)),
                ('product_category', models.CharField(max_length=10)),
                ('product_producing_time', models.CharField(max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Purchasing_order',
            fields=[
                ('purchasing_order_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('purchasing_order_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Purchasing_order_detail',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('purchasing_Order_quantity', models.CharField(max_length=10)),
                ('material_id', models.ForeignKey(to='web.Material')),
                ('purchasing_order_id', models.ForeignKey(to='web.Purchasing_order')),
            ],
        ),
        migrations.CreateModel(
            name='Recipe_of_half_product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('recipe_quantity', models.CharField(max_length=10)),
                ('half_product_id', models.ForeignKey(to='web.Half_product')),
                ('material_id', models.ForeignKey(to='web.Material')),
            ],
        ),
        migrations.CreateModel(
            name='Recipe_of_product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('recipe_quantity', models.CharField(max_length=10)),
                ('half_product_id', models.ForeignKey(to='web.Half_product')),
                ('product_id', models.ForeignKey(to='web.Product')),
            ],
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('store_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('store_name', models.CharField(max_length=10)),
                ('store_address', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('supplier_id', models.CharField(primary_key=True, max_length=10, serialize=False)),
                ('supplier_name', models.CharField(max_length=10)),
                ('supplier_address', models.CharField(max_length=30)),
            ],
        ),
        migrations.AddField(
            model_name='purchasing_order',
            name='supplier_id',
            field=models.ForeignKey(to='web.Supplier'),
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
