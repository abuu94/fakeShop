# fot celery
# your_app/tasks.py

from celery import shared_task
from .models import Fact
from .views import get_random_fact  # Import your function


from datetime import datetime, timedelta


@shared_task
def generate_and_save_fun_fact():
    fun_fact_text = get_random_fact()
    if fun_fact_text:
        Fact.objects.create(text=fun_fact_text)
        print(f"New fun fact generated: {fun_fact_text}")
    else:
        print("Failed to generate fun fact.")


@shared_task
def delete_old_facts_task():
    threshold_date = datetime.now() - timedelta(minutes=5)  # Keep facts from the last 7 days
    Fact.objects.filter(created_at__lt=threshold_date).delete()
