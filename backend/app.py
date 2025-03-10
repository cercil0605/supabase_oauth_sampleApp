from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client

app = Flask(__name__)
CORS(app)
# SUPABASEの情報
SUPABASE_URL = "https://your-project.supabase.co"
SUPABASE_KEY = "your-service-role-key"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route("/verify-token", methods=["POST"])
def verify_token():
    data = request.json
    token = data.get("token")

    if not token:
        return jsonify({"error": "Token required"}), 400

    try:
        # authenticationに登録されてるユーザーと検証
        user = supabase.auth.get_user(token)
        return jsonify(user)
    except Exception as e:
        return jsonify({"error": str(e)}), 401

if __name__ == "__main__":
    app.run(debug=True)
