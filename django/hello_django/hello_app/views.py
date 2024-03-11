from django.http import HttpResponse
from django.views.decorators.http import require_GET
import json

def home(request):
    return HttpResponse("Hello, Django!")

# Show all header information
# @require_GET # will restrict the view to only accept GET requests
def headers(request):
    # Print headers nicely one per line
    headers = "<br>".join([f"{header}: {value}" for header, value in request.headers.items()])
    return HttpResponse(f"""
                            <h1>Request Headers/Characteristics:</h1>
                            <p style='text-wrap:wrap'>{headers}</p>
                            <p>Method: {request.method}</p>
                            <p>Path: {request.path}</p>
                            <p>Port: {request.get_port()}</p>
                            <p>Is Secure: {request.is_secure()}</p>
                        """)

# Print GET query or POST JSON data
def data(request):
    data = ""
    if request.method == "GET":
        data = "<br>".join([f"{header}: {value}" for header, value in request.GET.items()])
    elif request.method == "POST" and request.content_type == "application/json":
        data = json.loads(request.body)
    return HttpResponse(
        f"""
            <h1>Request Data:</h1>
            <p>{data}</p>
        """)

