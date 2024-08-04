
/**
 * Counts the occurrences of each word in a given text.
 *
 * @param {string} text - The input text to be analyzed.
 * @param {boolean} [ignoreCase=false] - If true, ignores case sensitivity when counting words.
 *
 * @returns {Array} An array containing:
 *  - Total word count as the first element.
 *  - An array of word-count pairs, sorted by count in descending order.
 *
 * **Requirements:**
 *  - Ignores empty words.
 *  - Strips punctuation from words.
 *  - Counts all words in the text.
 *  - Counts the occurrences of each word.
 *  - Optionally ignores case sensitivity.
 *  - Returns a map or dictionary of word counts.
 *  - Returns total word count as the first item in the result array.
 *  - Sorts word counts by frequency in descending order.
 */
function countWords(text, ignoreCase = false) {

    const punctuationRegex = /[^\w\s]/g;
    const wordCountMap = new Map();

    const words = text
      .split(/\s+/)
      .filter(word => word !== '')
      .map(word => word.replace(punctuationRegex, ''));

    words.forEach(word => {
      const normalizedWord = ignoreCase ? word.toLowerCase() : word;
      wordCountMap.set(normalizedWord, (wordCountMap.get(normalizedWord) || 0) + 1);
    });

    const totalWordCount = words.length;
    const sortedWordCounts = [...wordCountMap.entries()].sort((a, b) => b[1] - a[1]);

    return [[totalWordCount, ...sortedWordCounts]];
}

const text = `
count ALL All words
count repeat each word
count with or non register
return map words with counter for each
Count all words in a given text.
Count the occurrences of each word.
Handle case sensitivity (with or without).
Return a map of words and their respective counts.
`;

console.log( countWords(text, false) )
