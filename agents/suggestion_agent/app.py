# Flask app for suggestion agent
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return 'Suggestion Agent Running'

if __name__ == '__main__':
    app.run(port=5004)
