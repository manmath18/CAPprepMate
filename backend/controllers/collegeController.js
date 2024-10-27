// collegeController.js
import axios from 'axios';

export const predictCollege = async (req, res) => {
  const { rank, percentile, gender, category, pwd, sortBy } = req.body;

  try {
    const response = await axios.post('http://127.0.0.1:5000/predict-college', {
        percentile,
        rank,
        state,
        pwd,
        gender,
        category,
        sortby
    });
    // Handle the response...
} catch (error) {
    console.error("Error fetching data:", error);
    setError("Error fetching data. Please try again."); // Handle network errors
}

};

