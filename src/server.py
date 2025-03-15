import os, random
import json
import sys
import base64
from flask import Flask, send_from_directory, send_file, request, flash, redirect, url_for
from ffmpy import FFmpeg
from werkzeug.utils import secure_filename

# Ensure src is in Python path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

SRC_PATH = os.path.abspath(os.path.dirname(__file__))

jn = lambda x: os.path.join(SRC_PATH, x)

UPLOAD_FOLDER = jn("../uploads")
THUMBNAILS_FOLDER = jn("../thumbnails")
MAX_UPLOADS_DIR_SIZE = 500000000 # 500 mb

uploads = []

app = Flask(__name__, static_folder=jn('static'))

def get_size(start_path = '.'):
    total_size = 0
    for dirpath, _, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # skip if it is symbolic link
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)

    return total_size

@app.route('/upload', methods=['GET','POST'])
def serve_upload():
    if request.method == "POST":
        if "file" not in request.files:
            flash("No file part")
            return redirect(request.url)
        file = request.files["file"]
        if file.filename == "":
            flash("No selected file")
            return redirect(request.url)
        if get_size(os.path.join(UPLOAD_FOLDER)) > MAX_UPLOADS_DIR_SIZE:
            flash("Max amount of uploads reached")
            return redirect(request.url)
        if file and str(file.filename).endswith(".mp4"):
            fullpath = os.path.join(UPLOAD_FOLDER, secure_filename(str(file.filename)))
            file.save(fullpath)
            try:
                ff = FFmpeg(inputs={fullpath: None}, outputs={
                    os.path.join(
                        THUMBNAILS_FOLDER,
                        secure_filename(str(file.filename)[:-4] + ".png")
                    ): ['-ss', '00:00:4', '-frames:v', '1']
                })
                ff.run()
            except:
                print("no ffmpeg")
            uploads = []
            for filename in os.listdir(UPLOAD_FOLDER):
                if filename.endswith(".mp4"):
                    uploads.append(filename[:-4])
            return redirect(url_for("serve_upload"))
    return send_file(os.path.join(str(app.static_folder), "upload.html"))

@app.route('/static/<path:filename>')
def serve_static(path):
    return send_from_directory(str(app.static_folder), secure_filename(str(path)))

@app.route("/api/videos")
def serve_videos():
    return json.dumps(uploads)

@app.route("/api/videos/<path:filename>")
def serve_video(filename):
    return send_file(os.path.join(UPLOAD_FOLDER, secure_filename(filename) + ".mp4"))

@app.route("/api/thumbnails/<path:filename>")
def serve_thumbnail(filename):
    return send_file(os.path.join(THUMBNAILS_FOLDER, secure_filename(filename) + ".png"))

AD_PATH = jn('./ads')
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
    return send_file(os.path.join(str(app.static_folder), 'index.html'))

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 21516))
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.endswith(".mp4"):
            uploads.append(filename[:-4])
    ENV = os.environ.get('DEPLOY_ENVIRONMENT', 'dev')

    print(f"Starting server on PORT: {PORT}, ENV: {ENV}")

    app.run(debug=ENV == 'dev',
            port=PORT, host="0.0.0.0" if ENV!='dev' else 'localhost')
