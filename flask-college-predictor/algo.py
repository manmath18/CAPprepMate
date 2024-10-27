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
    category_data = []
    for college_name, branches in data.items():
        for branch_name, details in branches.items():
            if "State Level" in details and category in details["State Level"]:
                category_data.append(details["State Level"][category])
    
    regressor = create_regressor(category_data)
    predicted_rank = regressor.predict(np.array([[perc]]))
    
    return max(int(predicted_rank[0][0]), 1)

def finalList(rank1, perc, category, state, gender, pwd, sortby, data):
    if rank1 == '-1':
        rank = float(pvr(perc, pwd, category))
    else:
        rank = rank1

    filtered_data = []

    # Iterate through the data to find the matching records
    for college_name, branches in data.items():
        for branch_name, details in branches.items():
            if "State Level" in details:
                state_data = details["State Level"]
                
                if category in state_data:
                    branch_percentile, branch_rank = state_data[category]
                    
                    # Apply filters based on rank and gender
                    if rank <= branch_rank:
                        filtered_data.append({
                            "College": college_name,
                            "Branch": branch_name,
                            "Category": category,
                            "Rank": branch_rank,
                            "Percentile": branch_percentile,
                            "Status": details['status']
                        })

    # Convert to DataFrame for sorting and further filtering
    df = pd.DataFrame(filtered_data)

    # Check if DataFrame is empty before sorting
    if df.empty:
        return pd.DataFrame()  # Return an empty DataFrame if no data

    # Debugging: Print the DataFrame before sorting
    print("DataFrame before sorting:")
    print(df.head())
    print("DataFrame columns:", df.columns)

    # Check if sortby column exists
    if sortby not in df.columns:
        raise KeyError(f"Sortby parameter '{sortby}' is invalid.")

    # Sorting by user-defined criteria
    df_sorted = df.sort_values(by=sortby)

    return df_sorted.drop_duplicates().reset_index(drop=True)