from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
import json

# Create your views here.

# Create a user only allowing POST requests
@require_http_methods(["POST"])
def create_user(request):
    data = json.loads(request.body)
    user = User.objects.create_user(data['username'], data['password'])
    return HttpResponse(f'User {user.username} created!')

# Delete a user only allowing DELETE requests
@require_http_methods(["DELETE"])
def delete_user(request):
    try:
        data = json.loads(request.body)
        user = User.objects.get(username=data['username'])
        user.delete()
        return HttpResponse(f'User {user.username} deleted!')
    except User.DoesNotExist:
        return HttpResponse(f'User {data["username"]} does not exist!')
    

