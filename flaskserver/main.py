from flask import Flask,jsonify,Response,request
import os
import OCR
from utils.randomfunc import randomString
from GPT import askGPT

app = Flask(__name__)

@app.route("/")
def hello_world():
   return Response("Flask Server is working! ",
                 status=200)

# Latest FIR image Uploaded
@app.route("/uploadFIR",methods = ["POST"])
def processFIR():
    if 'file' not in request.files:
       return Response("Image not uploaded",
                       status=400)  
    file = request.files['file']
    if file.filename == '':
       return Response("File not Selected",status = 400)
    file.save(os.path.join('.','FIRImage.jpg'))
    try: 
       key_string = randomString()
       image_to_ocr = OCR.get_text("FIRImage.jpg")
       f = open(f"summaries/{key_string}_summary.txt","w",encoding='utf-8')
       f.write(image_to_ocr)
       f.close()
       return jsonify({
          "text" : image_to_ocr, 
          "queryToken" : randomString()
       })
    
    except Exception as e: 
       print(e)
       return Response("Internal Server Error",500)

@app.route("/summary",methods = ["POST"])
def generateFIR():
   data = request.json
   if 'token' not in list(data.keys()):
      return jsonify({"message": "Token not specified"}), 400
   elif f"{data['token']}_summary.txt" not in os.listdir('summaries'):
      return jsonify({"message" : "Invalid Token"}),400
   try: 
      f = open(f"summaries/{data['token']}_summary.txt","r")
      text = "".join(f.readlines())
      ans = askGPT(f"Generate Summary of this FIR {text}")
      f.close()
      return jsonify({
         "message" : ans
      }),200
      
   except Exception as e:
      print(str(e))
      return jsonify({"message" : "Internal Server Error"}),500

@app.route("/bulletPointSummary",methods = ["POST"])
def generateBulletPointSummary():
   data = request.json
   if 'token' not in list(data.keys()):
      return jsonify({"message": "Token not specified"}), 400
   elif f"{data['token']}_summary.txt" not in os.listdir('summaries'):
      return jsonify({"message" : "Invalid Token"}),400
   try: 
      f = open(f"summaries/{data['token']}_summary.txt","r")
      text = "".join(f.readlines())
      ans = askGPT(f"Generate bulllet point summaries (10 points):  {text}")
      f.close()
      return jsonify({
         "message" : list(ans.split("\n"))
      }),200
      
   except Exception as e:
      return jsonify({"message" : "Internal Server Error"}),500



if __name__ == "__main__":
  app.run(debug=True)