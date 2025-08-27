# Flask app for user behavior tracker
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return 'User Behavior Tracker Running'

if __name__ == '__main__':
    app.run(port=5003)
