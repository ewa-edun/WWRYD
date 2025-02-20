import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, User, RoleModel, ChatHistory
from functools import wraps
import jwt
from datetime import datetime, timedelta
from flask_cors import CORS  # Add this import
import firebase_admin
from firebase_admin import credentials, auth, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate('path/to/your/serviceAccountKey.json')
firebase_admin.initialize_app(cred)

app = Flask(__name__)
CORS(app)  # Enable CORS
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'
db.init_app(app)


# Authentication Decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            parts = request.headers['Authorization'].split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            # Verify the Firebase token
            decoded_token = auth.verify_id_token(token)
            current_user = User.query.filter_by(email=decoded_token['email']).first()
            if not current_user:
                # Create user if they don't exist
                current_user = User(email=decoded_token['email'], name=decoded_token.get('name', ''))
                db.session.add(current_user)
                db.session.commit()
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401
        
        return f(current_user, *args, **kwargs)
    return decorated
db = firestore.client()

# Chat API Endpoint
@app.route('/api/chat', methods=['POST'])
@token_required
def chat(current_user):
    data = request.get_json()
    user_message = data.get('message')
    role_model_id = data.get('role_model_id')

    if not user_message or not role_model_id:
        return jsonify({'message': 'Please provide role_model_id and message'}), 400

    role_model = RoleModel.query.get(role_model_id)
    if not role_model:
        return jsonify({'message': 'Role model not found'}), 404


    # Store chat history in database
    chat_entry = ChatHistory(
        user_id=current_user.id,
        role_model_id=role_model.id,
        message=user_message,
        response=reply
    )
    db.session.add(chat_entry)
    db.session.commit()

    return jsonify({'reply': reply})

# Authentication Endpoints
@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if user and password == "password":  # Replace with proper password verification
        token = jwt.encode(
            {'user_id': user.id, 'exp': datetime.utcnow() + timedelta(hours=1)},
            app.config['SECRET_KEY'],
            algorithm="HS256"
        )
        return jsonify({'token': token})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')
    # In production, you must hash the password and store it safely.
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400
    user = User(email=email, name=name)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

# -------------------------
# App Runner
# -------------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
