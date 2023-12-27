import random 
import string 

def randomString():
    orig = [i for i in string.ascii_lowercase + string.digits]
    random.shuffle(orig)
    return "".join(orig[:15])

