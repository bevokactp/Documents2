import React, { useState } from 'react';
import NumberSystem from './numbers';

const Numbers = () => {
	const [intNumber, setIntNumber] = useState(0);
	const [convertedNumbers, setConvertedNumbers] = useState({});
	const numberSystem = new NumberSystem();

	const handleNumberChange = (e) => {
		const newNumber = parseInt(e.target.value, 10) || 0;
		setIntNumber(newNumber);
		setConvertedNumbers(numberSystem.convertNumber(newNumber));
	};

	const getSymbolTable = () => {
		const rows = [];
		for (let i = 0; i <= 108; i++) {
			const row = [i];
			for (let base of numberSystem.systems) {
				row.push(numberSystem.convertToBase(i, base));
			}
			rows.push(row);
		}
		return rows;
	};

	return (
		<div>
			<h1>Number System Converter</h1>
			<div>
				<label>
					Enter number:
					<input type="number" value={intNumber} onChange={handleNumberChange} />
				</label>
			</div>
			<table>
				<thead>
					<tr>
						<th>System</th>
						<th>Value</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(convertedNumbers).map(([base, value]) => (
						<tr key={base}>
							<td>Base {base}</td>
							<td>{value}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>Symbol Table</h2>
			<table>
				<thead>
					<tr>
						<th>Decimal</th>
						{numberSystem.systems.map(base => (
							<th key={base}>Base {base}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{getSymbolTable().map((row, index) => (
						<tr key={index}>
							{row.map((cell, cellIndex) => (
								<td key={cellIndex}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Numbers;
