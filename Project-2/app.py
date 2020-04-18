import numpy as np
from datetime import datetime as dt
import pandas as pd
import json
from pandas import DataFrame
from flask import Flask, jsonify 
from flask import request
from flask_cors import CORS
​
# Import our pymongo library, which lets us connect our Flask app to our Mongo database.
import pymongo
​
# Create an instance of our Flask app.
app = Flask(__name__)
​
​
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'
​
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:8000"}})
​
# Create connection variable
conn = 'mongodb://localhost:27017'
​
# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)
​
# Connect to a database. Will create one if not already available.
db = client.COVID_19
​
    
# Flask Routes
@app.route("/")
def welcome():
   
    return (
        f"Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/start<br/>"
        f"/api/v1.0/start/<end><br/>"          
    )
​
@app.route("/api/covid_cases")
def covid_cases():
     # Store the entire covid  cases collection in a list
     covid_cases_df = DataFrame(list(db.US_COVID_cases.find({},{ "_id": 0 })))
     covid_cases_df=covid_cases_df.groupby(['Date'])['Confirmed','Deaths'].sum().reset_index()
     d = covid_cases_df.to_json(orient='records')
     data = json.loads(d)
     #print(data)
    
    # print(covid_cases)
    # Return the template with the teams list passed in
    #return render_template('index.html', teams=teams)
     return jsonify(data)
     
@app.route("/api/covid_cases/state/")
def covid_cases__state_args():
     state = request.args.get('name')
     # Store the entire covid  cases collection in a list
     covid_cases_df = DataFrame(list(db.US_COVID_cases.find({"Province/State":state},{ "_id": 0 })))
     covid_cases_df=covid_cases_df.groupby(['Date'])['Confirmed','Deaths'].sum().reset_index()
     d = covid_cases_df.to_json(orient='records')
     data = json.loads(d)
     return jsonify(data)
​
@app.route("/api/covid_cases/date/")
def covid_cases_day_args():
     day = request.args.get('day')
     # Store the entire covid  cases collection in a list
     covid_cases_df = DataFrame(list(db.US_COVID_cases.find({"Date":day},{ "_id": 0 })))
     covid_cases_df=covid_cases_df.groupby(['Province/State','latitude','longitude'])['Confirmed','Deaths'].sum().reset_index()
     d = covid_cases_df.to_json(orient='records')
     data = json.loads(d)
     return jsonify(data)
     
    
# Define Main Behavior
if __name__ == '__main__':
    app.run(debug=True) 


