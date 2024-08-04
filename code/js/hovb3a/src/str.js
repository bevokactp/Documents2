
export const translateToValidModuleName = (str) => {
    // Return the translated character if it exists in the table, otherwise return the original character

    // let originalText = 'толока складчина лесосад рисовать'; 
    // console.log(translateToValidModuleName(originalText));

    const translationTable = {
        'ё': '7',
        'є': 's',
        'д': 'd',
        'щ': 'f',
        'ъ': 'g',
        'ы': 'q',
        'э': '2',
        'ж': 'z',
        'и': '1',
        'й': 'l',
        'ю': '5',
        'ф': '0',
        'з': '3',
        'ч': '4',
        'б': '6',
        'в': '8',
        'я': '9',
        'а': 'a',
        'ь': 'b',
        'с': 'c',
        'е': 'e',
        'н': 'h',
        'і': 'i',
        'ї': 'j',
        'к': 'k',
        'м': 'm',
        'п': 'n',
        'о': 'o',
        'р': 'p',
        'г': 'r',
        'т': 't',
        'ц': 'u',
        'л': 'v',
        'ш': 'w',
        'х': 'x',
        'у': 'y',
        ' ': '_'
    };

    return str.split('').map((char) => translationTable[char] || char ).join('');
}
