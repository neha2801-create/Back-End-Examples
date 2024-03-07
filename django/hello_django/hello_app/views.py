from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime

# A basic view returing a string
def home(request):
    return HttpResponse("Hello, Django!")
