const fs = require('fs');
const path = require('path');

const DIRS_TSV_PATHS = [
  './public/db/марки/растительно/',
  // './public/db/коло/',
];

const outputFile = './public/tsvFileList.json';

let fileList = [];

DIRS_TSV_PATHS.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(file => file.endsWith('.tsv'));
    fileList = fileList.concat(files.map(file =>
      `.${path.sep}${path.relative('./public', path.join(dir, file))}` // Ensure relative to 'public'
    ));
  }
});

fs.writeFileSync(outputFile, JSON.stringify(fileList, null, 2));

console.log(`File list saved to ${outputFile}`);
