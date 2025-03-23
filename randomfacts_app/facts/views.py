# from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
import requests
from .models import Fact, Comment

# set time to delete old fun fact
# from celery import shared_task
# from datetime import datetime, timedelta
# from .models import Fact

# add export TOGETHER_API_KEY=a34d8f927adc9d056b1d82ed264f468f686c32f0c238380490759eaa0b420afb
from django.views.decorators.csrf import csrf_exempt
import together
import base64

# Configure Together AI API key
together.api_key = "a34d8f927adc9d056b1d82ed264f468f686c32f0c238380490759eaa0b420afb"  # Replace with your actual API key

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

# @csrf_exempt # disable csrf for this example. in production use better security.
# def text_to_speech(request):
#     """Converts the fun fact text to speech using Together AI."""
#     if request.method == "POST":
#         fun_fact_text = request.POST.get("fun_fact_text")
#         if fun_fact_text:
#             try:
#                 output = together.Complete.create(
#                     prompt=f"Convert this text to speech: {fun_fact_text}",   
#                     model="elevenlabs/eleven-multilingual-v1",
#                     max_tokens=200,
#                 )

#                 audio_base64 = output.output.choices[0].text.split("base64,")[1]
#                 return JsonResponse({"audio_base64": audio_base64})
#             except Exception as e:
#                 print(f"Error during TTS: {e}")
#                 return JsonResponse({"error": str(e)}, status=500)
#     return JsonResponse({"error": "Invalid request"}, status=400)

# @csrf_exempt
# def speech_to_text(request):
#     """Converts speech to text using Together AI."""
#     if request.method == "POST" and request.FILES.get('audio'):
#         audio_file = request.FILES['audio']
#         audio_base64 = base64.b64encode(audio_file.read()).decode('utf-8')

#         try:
#             output = together.Complete.create(
#                 prompt=f"Convert this audio to text: data:audio/webm;base64,{audio_base64}",
#                 model="openai/whisper-1",
#                 max_tokens=200,
#             )
#             text = output.output.choices[0].text
#             return JsonResponse({"text": text})
#         except Exception as e:
#             print(f"Error during STT: {e}")
#             return JsonResponse({"error": str(e)}, status=500)
#     return JsonResponse({"error": "Invalid request"}, status=400)

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


