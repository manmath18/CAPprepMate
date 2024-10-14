import React, { useState } from "react";
import Navbar from "./shared/Navbar";

const PercentileP = () => {
  const [marks, setMarks] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [predictedPercentile, setPredictedPercentile] = useState(null);

  const marksPercentile = [
    { marks: 160, maxPercentile: 100, minPercentile: 99.50 },
    { marks: 150, maxPercentile: 99.50, minPercentile: 99.00 },
    { marks: 130, maxPercentile: 99.00, minPercentile: 98.00 },
    { marks: 110, maxPercentile: 98.00, minPercentile: 96.00 },
    { marks: 100, maxPercentile: 96.00, minPercentile: 95.00 },
    { marks: 96, maxPercentile: 95.00, minPercentile: 92.00 },
    { marks: 81, maxPercentile: 91.00, minPercentile: 85.00 },
    { marks: 61, maxPercentile: 83.00, minPercentile: 66.00 },
    { marks: 50, maxPercentile: 65.00, minPercentile: 55.00 },
    { marks: 0, maxPercentile: 55.00, minPercentile: 0.00 }
  ];

  const predictPercentile = () => {
    let adjustedMarks = parseFloat(marks);

    if (isNaN(adjustedMarks) || adjustedMarks < 0) {
      setPredictedPercentile("Please enter valid marks (0 or above).");
      return;
    }

    // Adjust marks based on difficulty level
    if (difficulty === "hard") {
      adjustedMarks += 10;
    } else if (difficulty === "easy") {
      adjustedMarks -= 10;
    }

    // Prevent adjusted marks from exceeding the max or min boundaries
    if (adjustedMarks > 160) adjustedMarks = 160;
    if (adjustedMarks < 0) adjustedMarks = 0;

    let percentile;
    for (let i = 0; i < marksPercentile.length - 1; i++) {
      if (marksPercentile[i].marks >= adjustedMarks && adjustedMarks > marksPercentile[i + 1].marks) {
        const maxMarks = marksPercentile[i].marks;
        const minMarks = marksPercentile[i + 1].marks;
        const maxPercentile = marksPercentile[i].maxPercentile;
        const minPercentile = marksPercentile[i + 1].minPercentile;

        percentile = ((adjustedMarks - minMarks) / (maxMarks - minMarks)) * (maxPercentile - minPercentile) + minPercentile;
        break;
      }
    }

    if (adjustedMarks >= 160) percentile = 100;
    if (percentile !== undefined) {
      setPredictedPercentile(`Your predicted percentile is: ${percentile.toFixed(2)}`);
    } else {
      setPredictedPercentile("Please enter valid marks.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-xl shadow-md w-1/2 h-96 mt-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          MHT-CET Percentile Predictor
        </h1>
        
        <label className="block text-left font-medium text-gray-700">
          Enter your MHT-CET Marks:
        </label>
        <input
          type="number"
          className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter marks between 0 and 200"
          min="0"
          max="200"
        />

        <label className="block text-left font-medium text-gray-700 mt-4">
          Select Difficulty Level:
        </label>
        <select
          className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="medium">Medium</option>
          <option value="easy">Easy</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={predictPercentile}
          className="w-full mt-6 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Predict Percentile
        </button>

        {predictedPercentile && (
          <p className="mt-4 text-2xl font-bold text-center text-gray-700">
            {predictedPercentile}
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default PercentileP;
