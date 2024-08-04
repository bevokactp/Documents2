import React, { useState, useEffect } from "react";

import { drawPerson } from "./drawTree";

const App = () => {
  const [genealogyData, setGenealogyData] = useState(null);
  const [selectedPersonId, setSelectedPersonId] = useState(null);

  useEffect(() => {
    // Fetch genealogy data
    fetch("/genealogy/genealogy.json")
      .then((response) => response.json())
      .then((data) => {
        setGenealogyData(data);
        // setSelectedPersonId(Object.keys(data.people)[3]); // Set the first person as default
      })
      .catch((error) => console.error("Error fetching genealogy data:", error));
  }, []);

  useEffect(() => {
    if (genealogyData && selectedPersonId) {
      const selectedPerson = genealogyData.people[selectedPersonId];
      if (selectedPerson) {
        drawCanvas(selectedPerson);
      }
      const div_table1 = document.getElementById("div_table1");
      const div_canvas = document.getElementById("div_canvas");
      if (div_table1 && div_canvas ) {
        div_table1.style.display = "none";
        div_canvas.style.display = "block";
      }
    }
  }, [genealogyData, selectedPersonId]);

  const handleCanvasClick = () => {
    const div_table1 = document.getElementById("div_table1");
    const div_canvas = document.getElementById("div_canvas");
    if (div_table1 && div_canvas ) {
      div_table1.style.display = "block";
      div_canvas.style.display = "none";
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("div_canvas");
    if (canvas) {
      canvas.addEventListener("dblclick", handleCanvasClick);
      return () => {
        canvas.removeEventListener("dblclick", handleCanvasClick);
      };
    }
  }, []);

  const drawCanvas = (person) => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    const diameter = 100; // Диаметр круга
    const radius = diameter / 2; // Радиус круга
    const xCenter = canvas.width / 2;
    const yCenter = canvas.height / 2;

    // Цвета
    const colorPerson = "#8A2BE2"; // Цвет для центрального круга и супруга
    const colorSpouse = "#8A2BE2"; // Цвет для супруга/супруги
    const colorSibling = "#4682B4"; // Цвет для братьев и сестер
    const colorChild = "#00BFFF"; // Цвет для детей
    const colorParent = "#003366"; // Темно-синий цвет для родителей

    // Центральный круг
    drawPerson(context, xCenter, yCenter, person, colorPerson, radius);

    // Супруг/супруга
    let spouseText = "";
    let spouseX = 0;
    if (person.gender === "м") {
      const spouse =
        genealogyData.people[
          getSpouseId(
            selectedPersonId,
            genealogyData.people,
            genealogyData.marriages
          )
        ];
      spouseText = spouse
        ? `${spouse.surname || ""}\n${spouse.name || ""}\n${
            spouse.patronymic || ""
          }`
        : "";
      spouseX = xCenter - 3 * radius;
      drawPerson(
        context,
        spouseX,
        yCenter,
        {
          surname: spouseText.split("\n")[0],
          name: spouseText.split("\n")[1],
          patronymic: spouseText.split("\n")[2],
        },
        colorSpouse,
        radius
      );

      // Братья
      let brotherX = xCenter + 3 * radius;
      getChildrenSonsDaughtersSiblingsLists( selectedPersonId, genealogyData.people ).siblings.forEach((sibling) => { if (sibling.gender === "м") { drawPerson(context, brotherX, yCenter, sibling, colorSibling, radius);
          brotherX += 2 * radius; // Шаг 2 диаметра круга
        }
      });

      // Сестры
      let sisterX = xCenter - 3 * radius;
      getChildrenSonsDaughtersSiblingsLists(
        selectedPersonId,
        genealogyData.people
      ).siblings.forEach((sibling) => {
        if (sibling.gender === "ж") {
          drawPerson(context, sisterX, yCenter, sibling, colorSibling, radius);
          sisterX -= 2 * radius; // Шаг 2 диаметра круга
        }
      });
    } else if (person.gender === "ж") {
      const spouse =
        genealogyData.people[
          getSpouseId(
            selectedPersonId,
            genealogyData.people,
            genealogyData.marriages
          )
        ];
      spouseText = spouse
        ? `${spouse.surname || ""}\n${spouse.name || ""}\n${
            spouse.patronymic || ""
          }`
        : "";
      spouseX = xCenter + 3 * radius;
      drawPerson(
        context,
        spouseX,
        yCenter,
        {
          surname: spouseText.split("\n")[0],
          name: spouseText.split("\n")[1],
          patronymic: spouseText.split("\n")[2],
        },
        colorSpouse,
        radius
      );

      // Братья
      let brotherX = xCenter + 5 * radius;
      getChildrenSonsDaughtersSiblingsLists(
        selectedPersonId,
        genealogyData.people
      ).siblings.forEach((sibling) => {
        if (sibling.gender === "м") {
          drawPerson(context, brotherX, yCenter, sibling, colorSibling, radius);
          brotherX += 2 * radius; // Шаг 2 диаметра круга
        }
      });

      // Сестры
      let sisterX = xCenter - 3 * radius;
      getChildrenSonsDaughtersSiblingsLists(
        selectedPersonId,
        genealogyData.people
      ).siblings.forEach((sibling) => {
        if (sibling.gender === "ж") {
          drawPerson(context, sisterX, yCenter, sibling, colorSibling, radius);
          sisterX -= 2 * radius; // Шаг 2 диаметра круга
        }
      });
    }

    // Дети
    const { sons, daughters } = getChildrenSonsDaughtersSiblingsLists(
      selectedPersonId,
      genealogyData.people
    );
    if (sons.length > 0) {
      const startX = xCenter + 2 * radius;
      sons.forEach((son, index) => {
        drawPerson(
          context,
          startX + index * 2.5 * radius,
          yCenter - 3 * radius,
          son,
          colorChild,
          radius
        );
      });
    }

    if (daughters.length > 0) {
      const startX = xCenter - 2 * radius;
      daughters.forEach((daughter, index) => {
        drawPerson(
          context,
          startX - index * 2.5 * radius,
          yCenter - 3 * radius,
          daughter,
          colorChild,
          radius
        );
      });
    }

    if (
      selectedPerson.father_id &&
      genealogyData.people[selectedPerson.father_id]
    ) {
      const father = genealogyData.people[selectedPerson.father_id];
      drawPerson(
        context,
        xCenter + 3 * radius,
        yCenter + 3 * radius,
        father,
        colorParent,
        radius
      ); // Нарисовать отца
    }

    if ( selectedPerson.mother_id && genealogyData.people[selectedPerson.mother_id] ) {
      const mother = genealogyData.people[selectedPerson.mother_id];
      drawPerson(
        context,
        xCenter - 3 * radius,
        yCenter + 3 * radius,
        mother,
        colorParent,
        radius
      ); // Нарисовать мать
    }

  };

  const getFullName = ({ surname = "", name = "", patronymic = "" } = {}) =>
    `${surname} ${name} ${patronymic}`.trim();

  const calculateCounts = (people) => {
    const counts = { totalPeople: 0, totalMen: 0, totalWomen: 0 };
    for (const person of Object.values(people)) {
      counts.totalPeople++;
      if (person.gender === "м") counts.totalMen++;
      if (person.gender === "ж") counts.totalWomen++;
    }
    return counts;
  };

  const getYearOfBirth = (person) => {
    return person.date_of_birth
      ? new Date(person.date_of_birth).getFullYear()
      : "";
  };

  const getAge = ({ date_of_birth, date_of_death }) => {
    const now = new Date();
    const birthDate = new Date(date_of_birth);
    const deathDate = date_of_death ? new Date(date_of_death) : now;
    return Math.max(deathDate.getFullYear() - birthDate.getFullYear(), 0);
  };

  const getSpouseId = (personId, people, marriages) => {
    if (!marriages || marriages.length === 0) return "";

    const latestMarriage = marriages.reduce((latest, marriage) => {
      if (!marriage.ids.includes(parseInt(personId))) return latest;

      const marriageDate = new Date(marriage.from);
      return !latest || marriageDate > new Date(latest.from)
        ? marriage
        : latest;
    }, null);

    if (!latestMarriage) return "";

    return latestMarriage.ids.find((id) => id !== parseInt(personId));
  };

  const getChildrenSonsDaughtersSiblingsLists = (personId, people) => {
    const person = people[personId];
    if (!person) return "";

    const children = Object.values(people).filter((person) =>
      [person.father_id, person.mother_id].includes(Number(personId))
    );
    return {
      children,
      daughters: children.filter((child) => child.gender === "ж"),
      sons: children.filter((child) => child.gender === "м"),
      siblings: Object.values(people).filter((sibling) => {
        return (
          sibling &&
          (parseInt(sibling.father_id) === parseInt(person.father_id) ||
            parseInt(sibling.mother_id) === parseInt(person.mother_id)) &&
          getPersonId(sibling) !== personId
        );
      }),
    };
  };

  const handleRowClick = (personId) => setSelectedPersonId(personId);

  const getPersonId = (person) => {
    return person
      ? Object.keys(genealogyData.people).find(
          (key) => genealogyData.people[key] === person
        )
      : "";
  };

  const { totalPeople, totalMen, totalWomen } = genealogyData
    ? calculateCounts(genealogyData.people)
    : { totalPeople: 0, totalMen: 0, totalWomen: 0 };
  const selectedPerson = selectedPersonId
    ? genealogyData.people[selectedPersonId]
    : null;
  const { children, daughters, sons, siblings } = selectedPerson
    ? getChildrenSonsDaughtersSiblingsLists(
        selectedPersonId,
        genealogyData.people
      )
    : { daughters: [], sons: [], children: [], siblings: [] };
  const father = selectedPerson
    ? genealogyData.people[selectedPerson.father_id]
    : null;
  const mother = selectedPerson
    ? genealogyData.people[selectedPerson.mother_id]
    : null;

  return (
    <div>
      {/* Tree */}
      <div id="div_canvas" style={{display: "none"}}>
        <canvas
          id="canvas"
          width="1000"
          height="400"
          style={{ border: "1px solid black", marginBottom: "20px" }}
        ></canvas>
      </div>

      <div style={{ display: "flex" }}>

        {/* Common Table */}
        <div style={{ flex: 1, marginRight: "20px" }} id="div_table1">
          <p>
            Всего: {totalPeople} ({totalMen}) (м) ({totalWomen}) (ж)
          </p>
          <table border="1">
            <thead>
              <tr>
                <th>№</th>
                <th>Обережество</th>
                <th>Імя</th>
                <th>Отчество</th>
                <th>Отецъ</th>
                <th>Мать</th>
                <th>Полъ</th>
                <th>Год рожденія</th>
                <th>Год смерти</th>
                <th>Детей</th>
                <th>Дочерей</th>
                <th>Синовей</th>
                <th>Сиблинги</th>
                <th>Возрастъ</th>
                <th>Спутник/ца</th>
              </tr>
            </thead>
            <tbody>
              {genealogyData &&
                Object.keys(genealogyData.people).map((personId) => {
                  const person = genealogyData.people[personId];
                  const { children, daughters, sons, siblings } =
                    getChildrenSonsDaughtersSiblingsLists(
                      personId,
                      genealogyData.people
                    );
                  return (
                    <tr key={personId} onClick={() => handleRowClick(personId)}>
                      <td>{personId}</td>
                      <td>{person.surname || ""}</td>
                      <td>{person.name || ""}</td>
                      <td>{person.patronymic || ""}</td>
                      <td>{person.father_id || ""}</td>
                      <td>{person.mother_id || ""}</td>
                      <td>{person.gender || ""}</td>
                      <td>{getYearOfBirth(person)}</td>
                      <td>
                        {person.date_of_death
                          ? new Date(person.date_of_death).getFullYear()
                          : ""}
                      </td>
                      <td>{children.length}</td>
                      <td>{daughters.length}</td>
                      <td>{sons.length}</td>
                      <td> {siblings.length} </td>
                      <td>{getAge(person)}</td>
                      <td>
                        {getSpouseId(
                          personId,
                          genealogyData.people,
                          genealogyData.marriages
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Personal Table */}
        <div style={{ flex: 1 }} id="div_table2">
          <h2>Personal Details</h2>
          {selectedPerson ? (
            <div>
              <h3>{getFullName(selectedPerson) || ""}</h3>
              <p>
                <strong>Отец:</strong>{" "}
                {father
                  ? `${father.surname || ""} ${father.name || ""} ${
                      father.patronymic || ""
                    } (${selectedPerson.father_id})`
                  : ""}
              </p>
              <p>
                <strong>Мать:</strong>{" "}
                {mother
                  ? `${mother.surname || ""} ${mother.name || ""} ${
                      mother.patronymic || ""
                    } (${selectedPerson.mother_id})`
                  : ""}
              </p>
              <p>
                <strong>Время рожденія:</strong>{" "}
                {selectedPerson.date_of_birth || ""}
              </p>
              <p>
                <strong>Возраст:</strong> {getAge(selectedPerson) || ""}
              </p>
              <p>
                <strong>Полъ:</strong> {selectedPerson.gender || ""}
              </p>
              <p>
                <strong>Дети:</strong> {children.length}
              </p>
              <ul>
                {children.map((item, index) => (
                  <li key={index}>
                    {getFullName(item)} ({getPersonId(item)})
                  </li>
                ))}
              </ul>
              <p>
                <strong>Дочери:</strong> {daughters.length}
              </p>
              <ul>
                {daughters.map((item, index) => (
                  <li key={index}>
                    {getFullName(item)} ({getPersonId(item)})
                  </li>
                ))}
              </ul>
              <p>
                <strong>Сыновья:</strong> {sons.length}
              </p>
              <ul>
                {sons.map((item, index) => (
                  <li key={index}>
                    {getFullName(item)} ({getPersonId(item)})
                  </li>
                ))}
              </ul>
              <p>
                <strong>Сиблинги:</strong> {siblings.length}
              </p>
              <ul>
                {siblings.map((item, index) => (
                  <li key={index}>
                    {getFullName(item)} ({getPersonId(item)})
                  </li>
                ))}
              </ul>
              <p>
                <strong>Спутник/ца:</strong>{" "}
                {getFullName(
                  genealogyData.people[
                    getSpouseId(
                      selectedPersonId,
                      genealogyData.people,
                      genealogyData.marriages
                    )
                  ]
                ) || ""}{" "}
                (
                {getSpouseId(
                  selectedPersonId,
                  genealogyData.people,
                  genealogyData.marriages
                )}
                )
              </p>
              <p>
                <strong>Жительства:</strong>{" "}
              </p>
              <ul>
                {selectedPerson.residences &&
                  selectedPerson.residences.map((res, index) => (
                    <li key={index}>
                      {res.place} ({res.from} - {res.to})
                    </li>
                  ))}
              </ul>
              <p>
                <strong>Занятия:</strong>
              </p>
              <ul>
                {selectedPerson.occupations &&
                  selectedPerson.occupations.map((occ, index) => (
                    <li key={index}>
                      {occ.occupation} ({occ.from} - {occ.to})
                    </li>
                  ))}
              </ul>
              <p>
                <strong>Год смерти:</strong>{" "}
                {selectedPerson.date_of_death || ""}
              </p>
              <p>
                <strong>Место смерти:</strong>{" "}
                {selectedPerson.place_of_death || ""}
              </p>
              <p>
                <strong>Причина смерти:</strong>{" "}
                {selectedPerson.cause_of_death || ""}
              </p>

              <p>
                <strong>Примечания:</strong> {selectedPerson.notes || ""}
              </p>
            </div>
          ) : (
            <p>Select a person to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
