import json
import requests
from base64 import b64encode
import sys

from apikeys.googleCloudVisionAPIKey import key

ENDPOINT_URL = 'https://vision.googleapis.com/v1/images:annotate'


def makeImageData(imgpath):

    try: 
        img_req = None
        with open(imgpath, 'rb') as f:
            ctxt = b64encode(f.read()).decode()
            img_req = {
                'image': {
                    'content': ctxt
                },
                'features': [{
                    'type': 'DOCUMENT_TEXT_DETECTION',
                    'maxResults': 1
                }]
            }
        return json.dumps({"requests": img_req}).encode()
    except Exception as e:
        raise Exception("Error While Processing Image",str(e))

def requestOCR(url, api_key, imgpath):
  try: 
    imgdata = makeImageData(imgpath)
    response = requests.post(url, 
                            data = imgdata, 
                            params = {'key': api_key}, 
                            headers = {'Content-Type': 'application/json'})
    if str(response.status_code)[0] == "4":
       raise Exception("Authorization Issues with API")
    return response
  except Exception as e:
     raise Exception("Error while making client request",str(e))


def get_text(img_loc):
    try:
        data = json.loads(requestOCR(ENDPOINT_URL,key,img_loc ).text)
        return data["responses"][0]['fullTextAnnotation']['text']
    except Exception as e: 
       raise Exception("Unable to Process OCR")

