import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

def create_regressor(data):
    X = np.array([item[0] for item in data]).reshape(-1, 1)
    y = np.array([item[1] for item in data]).reshape(-1, 1)
    
    regressor = LinearRegression()
    regressor.fit(X, y)
    return regressor

def pvr(perc, pwd, category, data):
    # Select the corresponding category data
    category_data = []
    for college_name, branches in data.items():
        for branch_name, details in branches.items():
            if "State Level" in details and category in details["State Level"]:
                category_data.append(details["State Level"][category])
    
    regressor = create_regressor(category_data)
    predicted_rank = regressor.predict(np.array([[perc]]))
    
    return max(int(predicted_rank[0][0]), 1)  # Ensure rank is positive
