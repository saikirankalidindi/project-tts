from flask import Flask, request, jsonify, send_file,render_template
from gtts import gTTS
import tempfile
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert():
    data = request.get_json()
    text = data['text']

    # Convert text to speech
    tts = gTTS(text)
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    tts.save(temp_file.name)

    # Send the audio file back to the client
    return send_file(temp_file.name, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
