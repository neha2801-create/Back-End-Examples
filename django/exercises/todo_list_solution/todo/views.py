from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import ToDo
import json

# Add the todo in POST request to the todo list
def add_todo(request):
    data = json.loads(request.body)
    print(data)
    user = User.objects.get(username=data["username"])
    todo = ToDo(title=data["title"], description=data["description"], user=user)
    todo.save()
    return HttpResponse(f"Todo {todo.title} added successfully")

# Get all the todos from the todo list
def get_todos(request):
    todos = ToDo.objects.all()
    print(todos)
    data = serializers.serialize('json', todos)
    return JsonResponse(data, safe=False)

# Get all todos of a specific user
def get_user_todos(request):
    data = json.loads(request.body)
    user = User.objects.get(username=data["username"])
    todos = ToDo.objects.filter(user=user)
    data = serializers.serialize('json', todos)
    return JsonResponse(data, safe=False)

# Remove the todo from the user's todo list
def remove_todo(request):
    data = json.loads(request.body)
    todo = ToDo.objects.get(title = data["title"], user = data["user"])
    todo.delete()
    return HttpResponse(f"Todo {todo.title} removed successfully")