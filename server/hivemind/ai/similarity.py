from semantic_text_similarity.models import WebBertSimilarity

bert_model = WebBertSimilarity(device='cpu', batch_size=1)

def sentence_semantic_similarity(string1, string2):
    """ returns the semantic similarity between two strings using Bert """
    try:
        score = bert_model.predict([(string1, string2)])
        return score.item()
    except:
        return 0.

