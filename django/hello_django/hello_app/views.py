from django.http import HttpResponse
from datetime import datetime

# A basic view returing a string with the current time
def home(request):
    return HttpResponse("Hello, Django! The time is: " + str(datetime.now().strftime("%H:%M:%S")))