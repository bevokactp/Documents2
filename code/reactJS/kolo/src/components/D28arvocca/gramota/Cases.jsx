import React, { useState } from "react";
import { Cases, casesData } from "./cases";

const cases = new Cases();

const DeclensionTable = () => {
	const [word, setWord] = useState("");
	const [declinedWords, setDeclinedWords] = useState({});

	const handleInputChange = (e) => {
		const input = e.target.value;
		setWord(input);

		const newDeclinedWords = {};
		for (const caseObj of Object.values(cases.cases)) {
			newDeclinedWords[caseObj.name] = caseObj.decline(input);
		}
		setDeclinedWords(newDeclinedWords);
	};

	return (
		<div>
			<h1>Склонение слова</h1>
			<input
				type="text"
				value={word}
				onChange={handleInputChange}
				placeholder="Введите слово"
			/>
			<h2>Общее количество падежей: {cases.getNumberOfCases()}</h2>
			<table>
				<thead>
					<tr>
						<th>Падеж</th>
						<th>Вопросы</th>
						<th>Форма слова</th>
					</tr>
				</thead>
				<tbody>
					{Object.entries(casesData).map(([caseName, caseObj]) => (
						<tr key={caseName}>
							<td>{caseObj.name}</td>
							<td>{caseObj.questions.join(', ')}</td>
							<td>{declinedWords[caseObj.name] || '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DeclensionTable;
