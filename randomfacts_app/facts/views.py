# from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
import requests
from .models import Fact, Comment



from django.views.decorators.csrf import csrf_exempt
import together
import base64

# Configure Together AI API key
together.api_key = "Together AI API key"  # Replace with your actual API key

def get_random_fact(request):
    # Fetch a random fact from the API    https://uselessfacts.jsph.pl/api/v2/facts/random?language=en    toa https://uselessfacts.jsph.pl/random.json?language=en
    response = requests.get("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en")
    if response.status_code == 200:
        fact_text = response.json().get("text")
        fact, created = Fact.objects.get_or_create(text=fact_text)
        return render(request, "facts/random_fact.html", {"fact": fact})
    return HttpResponse("Error fetching the fact!", status=500)

def like_fact(request, fact_id):
    fact = get_object_or_404(Fact, id=fact_id)
    fact.likes += 1
    fact.save()
    return JsonResponse({"likes": fact.likes, "dislikes": fact.dislikes})

def dislike_fact(request, fact_id):
    fact = get_object_or_404(Fact, id=fact_id)
    fact.dislikes += 1
    fact.save()
    return JsonResponse({"likes": fact.likes, "dislikes": fact.dislikes})

def add_comment(request, fact_id):
    fact = get_object_or_404(Fact, id=fact_id)
    content = request.POST.get("comment")
    if content:
        Comment.objects.create(fact=fact, content=content)
    return JsonResponse({"comments": list(fact.comments.values("content"))})

def dashboard_view(request):
    context = {
        'title': 'Dashboard',
        # Add any data you want to display
    }
    facts = Fact.objects.all()
    # return render(request, 'dashboard.html', context)
    return render(request, "facts/dashboard.html", {'facts':facts})

# view single record
def view_fact_view(request, fact_id):
    fact = get_object_or_404(Fact, id=fact_id)
    return render(request, 'facts/view_fact.html', {'fact': fact})


