import React from 'react';

// Data for filters
const categories = [
  'OPEN',
  'OPEN (PwD)',
  'GEN-EWS',
  'GEN-EWS(PwD)',
  'OBC-NCL',
  'OBC-NCL(PwD)',
  'SC',
  'SC (PwD)',
  'ST',
  'ST (PwD)',
];

const quotas = ['All', 'AI', 'HS', 'OS', 'AP', 'GO'];

const courseDuration = ['All', '4 Years', '5 Years'];

const seatTypes = ['All', 'Gender-Neutral', 'Female-Only'];

const columns = [
  {
    title: 'Institute name',
    property: 'institute',
    style: { width: '30%' },
  },
  {
    title: 'Program',
    property: 'program',
    style: { width: '65%' },
  },
  {
    title: 'Quota',
    property: 'quota',
    data: quotas,
    style: { width: '5%' },
  },
  {
    title: 'Categories',
    property: 'category',
    data: categories,
    style: { width: '5%' },
  },
  {
    title: 'Seat Type',
    property: 'seat',
    data: seatTypes,
    style: { width: '5%' },
  },
  {
    title: 'Opening Rank',
    property: 'openingRank',
    style: { width: '5%' },
  },
  {
    title: 'Closing Rank',
    property: 'closingRank',
    style: { width: '5%' },
  },
  {
    title: 'College Type',
    property: 'type',
    style: { width: '5%' },
  },
  {
    title: 'Course Duration',
    property: 'courseDuration',
    data: courseDuration,
    style: { width: '5%' },
  },
];

// TableFilter Component
const TableFilter = ({ title, property, value, data, updateFilters }) => (
  <th className="p-2">
    <span className="font-semibold">{title}</span>
    {data?.length && (
      <select
        id={property}
        name={title}
        value={value}
        onChange={(e) => updateFilters(property, e.target.value)}
        className="mt-1 p-1 bg-gray-800 text-yellow-400 border-2 border-yellow-400 rounded focus:outline-none"
      >
        {data.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    )}
  </th>
);
const CollegeTable = ({ filters, updateFilters }) => (
  <table className="min-w-full table-auto border-collapse bg-gray-100 shadow-lg mt-5">
    <thead className="bg-gray-800 text-white">
      <tr>
        {columns.map((column) => (
          <TableFilter
            key={column.property}
            title={column.title}
            property={column.property}
            value={filters[column.property]}
            data={column.data}
            updateFilters={updateFilters}
          />
        ))}
      </tr>
    </thead>
    <tbody>
      {/* Rows would go here, dynamically rendered based on filter results */}
    </tbody>
  </table>
);

const CollegePredictorWithFilters = () => {
  const [filters, setFilters] = React.useState({
    category: 'OPEN',
    quota: 'All',
    seat: 'All',
    courseDuration: 'All',
  });

  const updateFilters = (property, value) => {
    setFilters({ ...filters, [property]: value });
  };

  return (
    <div className="">
      <CollegeTable filters={filters} updateFilters={updateFilters} />
    </div>
  );
};

export default CollegePredictorWithFilters;
    