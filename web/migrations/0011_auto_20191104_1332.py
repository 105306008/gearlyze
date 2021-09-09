# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0010_auto_20190108_1407'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('articleId', models.UUIDField(verbose_name='文章ID', primary_key=True, default=uuid.uuid4, serialize=False)),
                ('articleTitle', models.CharField(verbose_name='文章標題', max_length=50)),
                ('articleDate', models.DateField(verbose_name='文章日期')),
                ('articleUrl', models.URLField(verbose_name='文章來源網址', blank=True)),
                ('articleWebsite', models.CharField(verbose_name='文章來源網站', max_length=100, blank=True)),
                ('articleContentRaw', models.TextField(verbose_name='原始文章內容', blank=True, default='')),
                ('articleContentAll', models.TextField(verbose_name='全詞性文章內容', blank=True, default='')),
                ('articleContentNoun', models.TextField(verbose_name='名稱文章內容', blank=True, default='')),
                ('emotionalScore', models.IntegerField(verbose_name='情緒分數')),
                ('articleTopic', models.CharField(verbose_name='文章主題', max_length=11)),
                ('articleCreatedTime', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('brandId', models.UUIDField(verbose_name='品牌ID', primary_key=True, default=uuid.uuid4, serialize=False)),
                ('brandName', models.CharField(verbose_name='品牌名稱', max_length=20)),
                ('brandNickname', models.CharField(verbose_name='品牌暱稱', max_length=50, blank=True)),
                ('brandIntroduction', models.TextField(verbose_name='品牌簡介', blank=True, default='')),
                ('brandCreatedTime', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Search',
            fields=[
                ('searchId', models.UUIDField(verbose_name='搜尋ID', primary_key=True, default=uuid.uuid4, serialize=False)),
                ('keyword', models.CharField(verbose_name='搜尋關鍵字', max_length=20)),
                ('emotionalScoreAnalysis', models.TextField(verbose_name='情緒分數分析', blank=True, default='')),
                ('correspondenceAnalysis', models.TextField(verbose_name='對應分析', blank=True, default='')),
                ('searchCreatedTime', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='inventory_of_store',
            name='product_id',
        ),
        migrations.RemoveField(
            model_name='inventory_of_store',
            name='store_id',
        ),
        migrations.RemoveField(
            model_name='manufacturing_record_detail',
            name='half_product_id',
        ),
        migrations.RemoveField(
            model_name='manufacturing_record_detail',
            name='manufacturing_record_id',
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
        migrations.RemoveField(
            model_name='purchasing_order',
            name='supplier_id',
        ),
        migrations.RemoveField(
            model_name='purchasing_order_detail',
            name='material_id',
        ),
        migrations.RemoveField(
            model_name='purchasing_order_detail',
            name='purchasing_order_id',
        ),
        migrations.RemoveField(
            model_name='recipe_of_half_product',
            name='half_product_id',
        ),
        migrations.RemoveField(
            model_name='recipe_of_half_product',
            name='material_id',
        ),
        migrations.RemoveField(
            model_name='recipe_of_product',
            name='half_product_id',
        ),
        migrations.RemoveField(
            model_name='recipe_of_product',
            name='product_id',
        ),
        migrations.DeleteModel(
            name='Customer',
        ),
        migrations.DeleteModel(
            name='Half_product',
        ),
        migrations.DeleteModel(
            name='Inventory_of_store',
        ),
        migrations.DeleteModel(
            name='Manufacturing_record',
        ),
        migrations.DeleteModel(
            name='Manufacturing_record_detail',
        ),
        migrations.DeleteModel(
            name='Material',
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
            name='Purchasing_order',
        ),
        migrations.DeleteModel(
            name='Purchasing_order_detail',
        ),
        migrations.DeleteModel(
            name='Recipe_of_half_product',
        ),
        migrations.DeleteModel(
            name='Recipe_of_product',
        ),
        migrations.DeleteModel(
            name='Store',
        ),
        migrations.DeleteModel(
            name='Supplier',
        ),
        migrations.AddField(
            model_name='article',
            name='articleBrand',
            field=models.ManyToManyField(help_text='Select a brand or brands for this article', related_name='brand_articles', to='web.Brand'),
        ),
    ]
