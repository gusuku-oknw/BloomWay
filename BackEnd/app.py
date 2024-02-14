import logging
import os
from datetime import datetime
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

app = Flask(__name__, static_folder="../FrontEnd/build/static", template_folder="../FrontEnd/build")
CORS(app)

# username = os.environ.get('DB_USERNAME')
# password = os.environ.get('DB_PASSWORD')
# host = os.environ.get('DB_HOST')
# port = os.environ.get('DB_PORT')
# database = os.environ.get('DB_DATABASE')
#
app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'postgresql://jun:G2eJxULFS0M3RufmS3gqSMli3OdoJLgA@dpg-cn6a0cq1hbls73c88cg0-a.oregon-postgres.render.com/feedback_jd74'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['JSON_AS_ASCII'] = False
db = SQLAlchemy(app)
Base = declarative_base()
# ログレベルを設定
app.logger.setLevel(logging.DEBUG)  # 任意のログレベルを選択
# logging.basicConfig(level=logging.INFO)  # Change as appropriate
handler = logging.StreamHandler()
app.logger.addHandler(handler)


class Feedback(db.Model):
    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer, primary_key=True)
    general = db.Column(db.String(500), nullable=False)
    performance = db.Column(db.String(500), nullable=True)
    usability = db.Column(db.String(500), nullable=True)
    star_panel_ratings = db.relationship('StarPanelRating', backref='feedback', lazy='dynamic')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Feedback {self.id}>"


class StarPanelRating(db.Model):
    __tablename__ = 'star_panel_ratings'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    feedback_id = db.Column(db.Integer, db.ForeignKey('feedbacks.id'), nullable=False)

    def __repr__(self):
        return f"<StarPanelRating {self.id}, Feedback {self.feedback_id}>"


with app.app_context():
    db.create_all()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/ChoicesPersonal', methods=['GET', 'POST'])
def get_personal():
    try:
        # articles = Article.query.all()
        # articles_json = [serialize_article(article) for article in articles]
        personal_json = {
            'message': "セラミドとトラネキサム酸　※実際の結果とは異なります。",
        }
        return jsonify(personal_json)
    except Exception as e:
        print(f"An error occurred: {e}")
        # You might want to return an error message or code here
        return jsonify({"error": "Could not fetch articles"}), 500


@app.route('/ChoicesFeedback', methods=['GET', 'POST'])
def get_feedback():
    if request.method == 'POST':
        try:
            data = request.json
            feedbacks = data.get('feedbacks')
            starPanels = data.get('starPanels')

            # Feedbackデータの保存
            feedback = Feedback(general=feedbacks.get('general'),
                                performance=feedbacks.get('performance'),
                                usability=feedbacks.get('usability'),
                                created_at=datetime.utcnow())
            db.session.add(feedback)
            db.session.flush()  # IDを取得するためにフラッシュする

            # StarPanelRatingsデータの保存
            for starPanel in starPanels:
                star_rating = StarPanelRating(question=starPanel['question'],
                                              rating=starPanel['rating'],
                                              feedback_id=feedback.id)
                db.session.add(star_rating)

            db.session.commit()

            return jsonify({'message': 'Feedback successfully saved'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Error saving feedback', 'error': str(e)}), 500
    else:
        # GETリクエストの場合の処理（必要に応じて）
        return jsonify({'message': 'This route supports only POST method'}), 405


if __name__ == '__main__':
    # app.debug = True
    app.run(debug=True)
