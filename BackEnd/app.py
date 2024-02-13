import logging
import os
from urllib.parse import quote_plus
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, String, Text, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import declarative_base
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

# from dotenv import load_dotenv
#
# load_dotenv()

app = Flask(__name__, static_folder="../frontend/build/static", template_folder="../frontend/build")
CORS(app)

# username = os.environ.get('DB_USERNAME')
# password = os.environ.get('DB_PASSWORD')
# host = os.environ.get('DB_HOST')
# port = os.environ.get('DB_PORT')
# database = os.environ.get('DB_DATABASE')
#
# app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{username}:{password}@{host}/{database}'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['JSON_AS_ASCII'] = False
# db = SQLAlchemy(app)
Base = declarative_base()
# ログレベルを設定
app.logger.setLevel(logging.DEBUG)  # 任意のログレベルを選択
# logging.basicConfig(level=logging.INFO)  # Change as appropriate
handler = logging.StreamHandler()
app.logger.addHandler(handler)


# with app.app_context():
#     db.create_all()

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/ChoicesPersonal', methods=['GET', 'POST'])
def get_personal():
    try:
        articles = Article.query.all()
        articles_json = [serialize_article(article) for article in articles]
        return jsonify(articles_json)
    except Exception as e:
        print(f"An error occurred: {e}")
        # You might want to return an error message or code here
        return jsonify({"error": "Could not fetch articles"}), 500


@app.route('/ChoicesFeedback', methods=['GET', 'POST'])
def get_feedback():
    try:
        articles = Article.query.all()
        articles_json = [serialize_article(article) for article in articles]
        return jsonify(articles_json)
    except Exception as e:
        print(f"An error occurred: {e}")
        # You might want to return an error message or code here
        return jsonify({"error": "Could not fetch articles"}), 500


def serialize_article(article):
    def time_to_seconds(time_str, back_time=20):
        try:
            clean_time_str = time_str.strip().strip('{}')
            parts = [int(part) for part in clean_time_str.split(':')]
            if len(parts) == 2:  # Format is M:S
                return parts[0] * 60 + parts[1] + back_time
            elif len(parts) == 3:  # Format is H:M:S
                return parts[0] * 3600 + parts[1] * 60 + parts[2] + back_time
            else:
                return 0  # Format error or empty string
        except ValueError:
            print(f"Error converting time: {time_str}. Ensure it's in H:M:S or M:S format.")
            return 0

    start_times = [time_to_seconds(time) for time in article.populartimes] if article.populartimes else []
    return {
        "id": article.id,
        "title": article.title,
        "summary": article.summary,
        "thumbnailurl": article.thumbnailurl,
        "publishedat": article.publishedat,
        "populartimes": article.populartimes,
        "startTimes": start_times,
        "videoid": article.videoid,
        "viewershipdata": article.viewershipdata,
        "articlelink": article.articlelink
    }


if __name__ == '__main__':
    # app.debug = True
    app.run(debug=True)
