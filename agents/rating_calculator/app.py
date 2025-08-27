# Flask app for rating calculator
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return 'Rating Calculator Running'

if __name__ == '__main__':
    app.run(port=5002)
