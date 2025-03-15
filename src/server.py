
from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__, static_folder='static')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/')
def index():
    return send_file(os.path.join(app.static_folder, 'index.html'))



if __name__ == '__main__':
    app.run(debug=True)
