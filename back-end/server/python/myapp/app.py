    
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app, resources={r"/": {"origins": ""}})

from app.routes import *

if __name__ == '__main__':
    app.run(debug=True)  