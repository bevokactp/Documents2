// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

// Установите путь к папке здесь
const directoryPath = '/home/bk/Insync/bevokactp@gmail.com/Google Drive/1/pa/1/мы11да8май/шитьё';

app.get('/files', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    res.json({ files, directoryPath });
  });
});

app.get('/files/:filename', (req, res) => {
  const filePath = path.join(directoryPath, req.params.filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Unable to read file: ' + err);
    }
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
