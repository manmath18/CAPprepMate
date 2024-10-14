import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';

const RankP = () => {
  const [percentile, setPercentile] = useState('');
  const [rank, setRank] = useState(null);

  const calculateRank = () => {
    const total = 295577;
    const parsedPercentile = parseFloat(percentile);

    if (isNaN(parsedPercentile) || parsedPercentile < 0 || parsedPercentile > 100) {
      setRank('Please enter a valid percentile between 0 and 100.');
      return;
    }

    let calculatedRank;
    if (parsedPercentile === 100) {
      calculatedRank = 1;
    } else {
      const outoff = (parsedPercentile / 100) * (total + 1);
      calculatedRank = total - outoff;
    }

    setRank(`Your predicted rank is ${Math.round(calculatedRank)}`);
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center h-svh bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-1/2 h-72 mt-8">
        <h1 className="text-2xl font-bold text-center mb-4">Rank Predictor (PCM)</h1>
        
        <label htmlFor="percentile" className="block text-md font-medium text-gray-700 mb-2">
          What is your MHT-CET percentile?
        </label>
        
        <input
          type="number"
          id="percentile"
          name="percentile"
          step="0.01"
          min="0"
          max="100"
          value={percentile}
          onChange={(e) => setPercentile(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter percentile (0-100)"
        />
        
        <Button
          onClick={calculateRank}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Calculate Rank
        </Button>
        
        {rank && (
          <p className="mt-4 text-lg font-semibold text-center text-gray-700">{rank}</p>
        )}
      </div>
    </div>
    </>
  );
};

export default RankP;
