
from flask import Flask, send_from_directory, send_file
import os, random
import json
import html
import base64
app = Flask(__name__, static_folder='static')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


AD_PATH = './ads'
VIDEO_AD_PATH = AD_PATH + '/videos'
IMAGE_AD_PATH = AD_PATH + '/images'

@app.route('/ads/video/random')
def random_video_ad():
    all_ads = os.listdir(VIDEO_AD_PATH)
    ad = random.choice(all_ads)
    data_uri = None
    with open(os.path.join(VIDEO_AD_PATH, ad), 'rb') as f:
        data_uri = base64.b64encode(f.read()).decode('utf-8')
    resp = data_uri
    print(resp)
    return resp

@app.route('/ads/image/random')
def random_image_ad():
    all_ads = os.listdir(IMAGE_AD_PATH)
    ad = random.choice(all_ads)
    data_uri = None
    with open(os.path.join(IMAGE_AD_PATH, ad), 'rb') as f:
        data_uri = base64.b64encode(f.read()).decode('utf-8')
        data_uri = 'data:image/jpeg;base64,' + data_uri
    resp = data_uri
    return json.dumps({"image": resp})


@app.route('/')
def index():
    return send_file(os.path.join(app.static_folder, 'index.html'))



if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5000)))
