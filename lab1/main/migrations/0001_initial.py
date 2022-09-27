# Generated by Django 4.1.1 on 2022-09-27 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone', models.CharField(blank=True, max_length=100, null=True)),
                ('address', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'customer',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'order',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('brand', models.CharField(blank=True, max_length=100, null=True)),
                ('type', models.CharField(blank=True, max_length=100, null=True)),
                ('price', models.CharField(blank=True, max_length=100, null=True)),
                ('strength', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'product',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProductOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_id', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'product_order',
                'managed': False,
            },
        ),
    ]
