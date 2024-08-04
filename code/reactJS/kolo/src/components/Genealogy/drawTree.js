
const drawCircleWithText = (context, x, y, text, color, radius) => {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI); // Диаметр круга 2 * radius
    context.fillStyle = color;
    context.fill();
    context.stroke();

    context.fillStyle = "#FFFFFF"; // Белый цвет текста
    context.textAlign = "center";
    context.font = "12px Arial"; // Размер шрифта 12px
    const lines = text.split("\n");
    lines.forEach((line, index) => {
      context.fillText(line, x, y - (lines.length - 1) * 6 + index * 14);
    });
  };

export const drawPerson = (context, x, y, person, color, radius) => {
    const personText = `${person.surname || ""}\n${person.name || ""}\n${
      person.patronymic || ""
    }`;
    drawCircleWithText(context, x, y, personText, color, radius);
  };
