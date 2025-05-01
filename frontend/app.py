from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # allows frontend to communicate with this backend

app = Flask(__name__)
CORS(app)  # optional: allows cross-origin requests

# 🔌 Connect to your MongoDB
client = MongoClient("mongodb://localhost:27017/")  # or use your MongoDB URI if hosted
db = client["natures_guardians"]
species_collection = db["species"]  # assuming your collection is called 'species'

@app.route("/search", methods=["GET"])
def search_species():
    query = request.args.get("query", "").strip()

    if not query:
        return jsonify([])

    # Search species by name or description (case-insensitive)
    results = species_collection.find({
        "$or": [
            {"name": {"$regex": query, "$options": "i"}},
            {"description": {"$regex": query, "$options": "i"}}
        ]
    })

    output = []
    for r in results:
        output.append({
            "name": r.get("name", ""),
            "description": r.get("description", ""),
            "image": r.get("image", "")  # optional: add image URL or path if exists
        })

    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)
