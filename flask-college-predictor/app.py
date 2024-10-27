import pandas as pd
import secrets
from flask import Flask, render_template, request, redirect, flash, jsonify
from pathlib import Path
import json
from algo import finalList
from rvp import pvr
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Load the MHTCET data from the JSON file
base_path = Path(__file__).parent
json_file_path = (base_path / "data/mhtcet_data.json").resolve()

with open(json_file_path, 'r') as f:
    mhtcet_data = json.load(f)

def calculate_results(percentile, rank, state, pwd, gender, category, sortby):
    if rank == "":
        ranks = pvr(float(percentile), pwd, category, mhtcet_data)
        ranks = int(ranks) if ranks else 0
        if ranks <= 0:
            ranks = 2  # minimum rank fallback
    else:
        ranks = int(rank)

    return finalList(ranks, float(percentile), category, state, gender, pwd, sortby, mhtcet_data)

@app.route("/", methods=["GET", "POST"])
def index():
    secret_key = secrets.token_hex(16)
    app.config["SECRET_KEY"] = secret_key

    if request.method == "POST":
        req = request.form

        percentile = req["percentile"]
        rank = req["rank"]
        state = req["state"]
        pwd = req["pwd"]
        gender = req["gender"]
        category = req["category"]
        sortby = str(req["sortby"]).strip()

        if percentile == "" and rank == "":
            flash("Please enter either your Rank or your Percentile", 'error')
            return redirect(request.url)

        # Handle the calculation based on rank or percentile
        if rank == "":
            ranks = pvr(float(percentile), pwd, category, mhtcet_data)
            ranks = int(ranks) if ranks else 0
            if ranks <= 0:
                ranks = 2  # minimum rank fallback
            result = finalList(ranks, float(percentile), category, state, gender, pwd, sortby, mhtcet_data)
        else:
            result = finalList(int(rank), float(percentile), category, state, gender, pwd, sortby, mhtcet_data)

        return render_template("public/result.html", ranks=rank, category=category, tables=[result.to_html(classes='data')], titles=result.columns.values)

    return render_template("public/index.html")

# New route for college prediction
@app.route("/predict-college", methods=["POST"])
def predict_college():
    req = request.get_json()
    if not req:
        return jsonify({"error": "No data provided"}), 400

    # Access keys safely
    percentile = req.get("percentile", "")
    rank = req.get("rank", "")
    state = req.get("state", "")
    pwd = req.get("pwd", "")
    gender = req.get("gender", "")
    category = req.get("category", "")
    sortby = str(req.get("sortby", "")).strip()

    # Ensure that at least one of rank or percentile is provided
    if not rank and not percentile:
        return jsonify({"error": "Please provide either Rank or Percentile."}), 400

    # Check for empty sortby
    if not sortby:
        return jsonify({"error": "Sortby parameter cannot be empty."}), 400

    # Calculate the ranks based on the input
    try:
        if rank:
            result = finalList(int(rank), float(percentile), category, state, gender, pwd, sortby, mhtcet_data)
        else:
            ranks = pvr(float(percentile), pwd, category, mhtcet_data)
            ranks = int(ranks) if ranks else 0
            result = finalList(ranks, float(percentile), category, state, gender, pwd, sortby, mhtcet_data)

        # Convert the DataFrame to a list of dictionaries
        colleges = result.to_dict(orient='records')

        # Return the result as JSON
        return jsonify(colleges)

    except KeyError as e:
        return jsonify({"error": f"Key error: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)