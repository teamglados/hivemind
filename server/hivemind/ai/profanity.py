import numpy as np
from profanity_check import predict_prob

def sentence_profanity_prob(string):
    """ returns the probability that a string is profanity """
    try:
        result = predict_prob([ string ])
        return result.item()
    except:
        return 0.
