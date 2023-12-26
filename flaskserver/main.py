from flask import Flask,jsonify,Response,request
import os
import OCR

app = Flask(__name__)

@app.route("/")
def hello_world():
   return Response("Flask Server is working! ",
                 status=200)

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
       image_to_ocr = OCR.get_text("FIRImage.jpg")
       return jsonify({
          "text" : image_to_ocr
       })
    except Exception as e: 
       print(e)
       return Response("Internal Server Error",500)

    



if __name__ == "__main__":
  app.run(debug=True)