from django.db import models

# Create your models here.
# from django.db import models

class Fact(models.Model):
    text = models.TextField()  # The fact text
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

class Comment(models.Model):
    fact = models.ForeignKey(Fact, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
