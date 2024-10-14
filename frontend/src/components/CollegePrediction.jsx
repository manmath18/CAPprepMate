import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Select } from './ui/select';
import { Input } from './ui/input';
import Navbar from './shared/Navbar';

// import { getByCategory } from '../../utils/getData';
// import PredictionTable from '../PredictionTable/PredictionTable';

const CollegePredictor = () => {
  const [colleges, setColleges] = useState([]);
  const [rank, setRank] = useState();
  const [isLoading, setLoading] = useState(false);
  const [exam, setExam] = useState('Advanced');
  const [filters, setFilters] = useState({ category: 'OPEN' });

//   const filterData = (college) => {
//     let finalVal = rank <= college.closingRank;
//     const dataFilters = {
//       ...filters,
//       type: exam === 'Advanced' ? 'IIT' : ['IIT'],
//     };

//     Object.keys(dataFilters).forEach((filter) => {
//       if (dataFilters[filter] !== 'All') {
//         if (Array.isArray(dataFilters[filter])) {
//           finalVal &= !dataFilters[filter].includes(college[filter]);
//         } else {
//           finalVal &= college[filter] === dataFilters[filter];
//         }
//       }
//     });
//     return finalVal;
//   };

//   const getFilteredColleges = () => new Promise((resolve) => {
//     const filteredColleges = getByCategory(filters.category).filter(filterData);

//     setTimeout(() => {
//       resolve(filteredColleges);
//     }, 1000);
//   });

//   const filterColleges = () => {
//     setLoading(true);
//     getFilteredColleges().then((filteredColleges) => {
//       setColleges(filteredColleges);
//       setLoading(false);
//     });
//   };

//   useEffect(() => {
//     filterColleges();
//   }, [exam, filters]);

  return (
    <>
        <Navbar/>
      <div className="bg-gray-100 p-5 mt-3 rounded-lg shadow-lg">
        <div className="flex justify-center mb-3">
          <span className="text-lg font-bold mt-2">MHTCET</span>
          <span className="ml-6 mt-2">Rank</span>
          <Input
            type="text"
            variant="outline"
            className="ml-4 w-40 border-spacing-1 "
            placeholder="Enter your Rank.."
            value={rank}
          />
          <Button
            type="button"
            className="ml-4 bg-[#8148e2] hover:bg-[#7731f0] text-silver font-bold uppercase border-2 border--400 rounded px-4 py-1 transition-all"
          >
            Get Predictions
          </Button>
        </div>
        <div className="text-center text-sm opacity-80 bg-gray-800 text-yellow-400 py-2 rounded-b-lg">
        </div>
      </div>
    </>
  );
};

export default CollegePredictor;
