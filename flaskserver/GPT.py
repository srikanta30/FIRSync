import requests
import json 
from apikeys.openAIAPIKey import key

def askGPT(prompt):
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {key}',
    }

    json_data = {
        'model': 'text-davinci-003',
        'prompt': prompt,
        'temperature': 1,
        'max_tokens': 256,
        'top_p': 1,
        'frequency_penalty': 0,
        'presence_penalty': 0,
    }

    try: 
        response = requests.post('https://api.openai.com/v1/completions', headers=headers, json=json_data)
        response_data = json.loads(response.text)
        print(response_data)
        return response_data['choices'][0]['text']
    except requests.exceptions.RequestException as e:
        raise Exception("Error while Processing GPT Response",str(e))
