# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import web.models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0011_auto_20191104_1332'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='search',
            name='correspondenceAnalysis',
        ),
        migrations.RemoveField(
            model_name='search',
            name='emotionalScoreAnalysis',
        ),
        migrations.RemoveField(
            model_name='search',
            name='keyword',
        ),
        migrations.AddField(
            model_name='search',
            name='correspondenceBrand',
            field=web.models.ListField(verbose_name='品牌維度', blank=True),
        ),
        migrations.AddField(
            model_name='search',
            name='correspondenceInput',
            field=web.models.ListField(verbose_name='品牌名稱', blank=True),
        ),
        migrations.AddField(
            model_name='search',
            name='correspondenceNeg',
            field=web.models.ListField(verbose_name='主題負向維度', blank=True),
        ),
        migrations.AddField(
            model_name='search',
            name='correspondencePos',
            field=web.models.ListField(verbose_name='主題正向維度', blank=True),
        ),
        migrations.AddField(
            model_name='search',
            name='emotionalScore',
            field=web.models.ListField(verbose_name='雷達圖', blank=True),
        ),
        migrations.AddField(
            model_name='search',
            name='searchBrand',
            field=models.CharField(verbose_name='搜尋品牌', max_length=30, default=''),
        ),
        migrations.AddField(
            model_name='search',
            name='trend',
            field=web.models.ListField(verbose_name='趨勢圖', blank=True),
        ),
        migrations.AddField(
            model_name='search',
            name='wordCloud',
            field=models.TextField(verbose_name='文字雲', default=''),
        ),
        migrations.AlterField(
            model_name='article',
            name='articleContentNoun',
            field=models.TextField(verbose_name='名詞文章內容', blank=True, default=''),
        ),
    ]
