import joblib
import pandas as pd
import sys
import os

# Current folder path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load model + encoders
model = joblib.load(os.path.join(BASE_DIR, "safety_model.pkl"))
city_encoder = joblib.load(os.path.join(BASE_DIR, "city_encoder.pkl"))
crime_encoder = joblib.load(os.path.join(BASE_DIR, "crime_encoder.pkl"))
time_encoder = joblib.load(os.path.join(BASE_DIR, "time_encoder.pkl"))

# Get inputs
city = sys.argv[1]
crime = sys.argv[2]
time = sys.argv[3]
police = int(sys.argv[4])

# Encode inputs
city_encoded = city_encoder.transform([city])[0]
crime_encoded = crime_encoder.transform([crime])[0]
time_encoded = time_encoder.transform([time])[0]

# Create dataframe
input_data = pd.DataFrame([[
    city_encoded,
    crime_encoded,
    time_encoded,
    police
]], columns=[
    "City",
    "Crime Description",
    "Time of Occurrence",
    "Police Deployed"
])

# Predict
prediction = model.predict(input_data)

print(prediction[0])