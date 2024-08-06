
import React from "react";
import { partsData } from "./parts";


const Parts = () => {
	return (
		<div>
			{Object.keys(partsData).map((key) => {
				const part = partsData[key];
				const hasSubtypes = part.types && Object.keys(part.types).length > 0;

				return (
					<div key={key} style={{ marginBottom: "20px" }}>
						<h2>
							{part.name} - {part.description}
						</h2>
						{part.questions && part.questions.length > 0 && (
							<p>
								<strong>Вопросы:</strong> {part.questions.join(", ")}
							</p>
						)}
						<p>
							<strong>Подтипы:</strong>{" "}
							{hasSubtypes ? Object.keys(part.types).length : "Нет"}
						</p>
						{hasSubtypes && (
							<table
								border="1"
								style={{ borderCollapse: "collapse", width: "100%" }}
							>
								<thead>
									<tr>
										<th>Название</th>
										<th>Описание</th>
										<th>Вопросы</th>
										<th>Примеры</th>
									</tr>
								</thead>
								<tbody>
									{Object.keys(part.types).map((subkey) => {
										const subtype = part.types[subkey];
										return (
											<tr key={subkey}>
												<td>{subtype.name}</td>
												<td>{subtype.description || "Не указано"}</td>
												<td>
													{subtype.questions
														? subtype.questions.join(", ")
														: "Нет"}
												</td>
												<td>
													{subtype.examples
														? subtype.examples.join(", ")
														: "Нет"}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Parts;
