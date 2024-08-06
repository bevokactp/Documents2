


function convertNumber(num) {
  if (!Number.isInteger(num)) {
    throw new Error('Input must be an integer.');
  }

  // Функция для преобразования числа в строку с заданной системой счисления (для стандартных систем счисления)
  const toBase = (num, base) => num.toString(base).toUpperCase();

  // Функция для преобразования числа в систему счисления с основанием 40
  const toBase40 = (num) => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcd'; // 40 символов
    let result = '';
    do {
      result = chars[num % 40] + result;
      num = Math.floor(num / 40);
    } while (num > 0);
    return result;
  };

  // Результаты преобразования
  return {
    binary: toBase(num, 2),
    octal: toBase(num, 8),
    duodecimal: toBase(num, 12),
    hexadecimal: toBase(num, 16),
    base40: toBase40(num)
  };
}

console.log(

  convertNumber(37)
)
