import React, { useState, useEffect } from "react";
import Papa from "papaparse";

import './Kolo.css';

const PATHS = [
  "/db/марки/число.tsv",
  "/db/коло/теоны.tsv",
  "/db/коло/пол.tsv",
  "/db/коло/раденіе.tsv",
  "/db/марки/растительно/грибы.tsv",
  "/db/марки/растительно/овощи.tsv",
  "/db/марки/растительно/злаки.tsv",
  "/db/марки/растительно/дарево.tsv",
];

const parseTSV = (data) => {
  return Papa.parse(data, {
    header: false,
    delimiter: "\t",
    skipEmptyLines: true,
  }).data;
};

const mergeData = (datasets, fileNames) => {
  const merged = new Map();

  datasets.forEach((data, fileIndex) => {
    data.forEach(([key, ...values]) => {
      if (!merged.has(key)) {
        merged.set(key, {});
      }
      const existingEntry = merged.get(key);
      const columnBaseName = fileNames[fileIndex];
      let columnName = columnBaseName;

      let counter = 1;
      while (existingEntry[columnName]) {
        counter += 1;
        columnName = `${columnBaseName}${counter}`;
      }
      existingEntry[columnName] = values.join(",");
    });
  });

  // Convert merged data back to an array of rows
  const header = [
    "номер",
    ...Array.from(
      new Set([].concat(...Array.from(merged.values()).map(Object.keys)))
    ),
  ];
  const rows = Array.from(merged, ([key, values]) => {
    const row = [key];
    header.slice(1).forEach((col) => row.push(values[col] || ""));
    return row;
  });

  return [header, ...rows];
};

const loadData = async () => {
  const fetchData = async (path) => {
    const response = await fetch(path);
    const data = await response.text();
    return parseTSV(data);
  };

  const datasets = await Promise.all(PATHS.map(fetchData));
  const fileNames = PATHS.map((path) =>
    path.split("/").pop().replace(".tsv", "")
  );
  return mergeData(datasets, fileNames);
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData().then((mergedData) => setData(mergedData));
  }, []);

  const [columnVisibility, setColumnVisibility] = useState(
    PATHS.reduce((acc, path) => {
      const fileName = path.split("/").pop().replace(".tsv", "");
      acc[fileName] = true;
      return acc;
    }, {})
  );

  // Function to toggle column visibility
  const toggleColumnVisibility = (fileName) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [fileName]: !prev[fileName],
    }));
  };

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const requestSort = (key) => {
	let direction = 'asc';
	if (sortConfig.key === key && sortConfig.direction === 'asc') {
	  direction = 'desc';
	}
	setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
	let sortableData = [...data.slice(1)];
	if (sortConfig.key !== null) {
	  sortableData.sort((a, b) => {
		if (sortConfig.key === 0) {
		  // Numeric sorting for the first column
		  return sortConfig.direction === 'asc'
			? parseInt(a[sortConfig.key]) - parseInt(b[sortConfig.key])
			: parseInt(b[sortConfig.key]) - parseInt(a[sortConfig.key]);
		} else {
		  if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === 'asc' ? -1 : 1;
		  }
		  if (a[sortConfig.key] > b[sortConfig.key]) {
			return sortConfig.direction === 'asc' ? 1 : -1;
		  }
		}
		return 0;
	  });
	}
	return [data[0], ...sortableData];
  }, [data, sortConfig]);

  const [filterConfig, setFilterConfig] = useState({
	теон: [],
	// other columns can have filters as needed
  });

  const toggleFilter = (column, value) => {
	setFilterConfig(prev => ({
	  ...prev,
	  [column]: prev[column].includes(value)
		? prev[column].filter(v => v !== value)
		: [...prev[column], value],
	}));
  };

  const filteredData = React.useMemo(() => {
	if (filterConfig['теон'].length === 0) {
	  return sortedData;
	}
	return sortedData.filter(row => filterConfig['теон'].includes(row[1]));
  }, [sortedData, filterConfig]);

  const uniqueValues = (columnIndex) => {
	const values = new Set(data.slice(1).map(row => row[columnIndex]));
	return Array.from(values);
  };



  return (
	<div>
	  {/* Checkboxes for each file */}
	  {PATHS.map((path, index) => {
		const fileName = path.split('/').pop().replace('.tsv', '');
		return (
		  <div key={index}>
			<input
			  type="checkbox"
			  checked={columnVisibility[fileName]}
			  onChange={() => toggleColumnVisibility(fileName)}
			/>
			<label>{fileName}</label>
		  </div>
		);
	  })}

	  <table>
		<thead>
		  <tr>
			{data[0]?.map((header, index) => {
			  const isSorted = sortConfig.key === index;
			  return (
				<th
				  key={index}
				  style={{ display: index === 0 || columnVisibility[header.split(/[0-9]/)[0]] ? 'table-cell' : 'none' }}
				  onClick={() => requestSort(index)}
				>
				  {header}
				  {isSorted && (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')}
				  {index === 1 && (
					<div className="filter-dropdown">
					  <span>⚙️</span> {/* Filter Icon */}
					  <div className="filter-options">
						{uniqueValues(index).map((value, i) => (
						  <div key={i}>
							<input
							  type="checkbox"
							  checked={filterConfig['теон'].includes(value)}
							  onChange={() => toggleFilter('теон', value)}
							/>
							<label>{value}</label>
						  </div>
						))}
					  </div>
					</div>
				  )}
				</th>
			  );
			})}
		  </tr>
		</thead>
		<tbody>
		  {filteredData.slice(1).map((row, index) => (
			<tr key={index}>
			  {row.map((cell, cellIndex) => (
				<td
				  key={cellIndex}
				  style={{ display: cellIndex === 0 || columnVisibility[data[0][cellIndex].split(/[0-9]/)[0]] ? 'table-cell' : 'none' }}
				>
				  {cell}
				</td>
			  ))}
			</tr>
		  ))}
		</tbody>
	  </table>
	</div>
  );
};

export default App;
