
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [directoryPath, setDirectoryPath] = useState('');

  useEffect(() => {
    axios.get('/files')
      .then(response => {
        setFiles(response.data.files);
        setDirectoryPath(response.data.directoryPath);
      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  const handleFileClick = (filename) => {
    setSelectedFile(filename);
    axios.get(`/files/${filename}`)
      .then(response => {
        setFileContent(response.data);
      })
      .catch(error => {
        console.error('Error fetching file content:', error);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
        <h3>{directoryPath}</h3>
        {selectedFile && (
          <div>
            <h2>{selectedFile}</h2>
            <pre>{fileContent}</pre>
          </div>
        )}
      </div>
      <div style={{ width: '200px', padding: '10px', borderLeft: '1px solid #ddd' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {files.map(file => (
            <li key={file} style={{ marginBottom: '5px' }}>
              <button
                onClick={() => handleFileClick(file)}
                style={{
                  width: '100%',
                  padding: '10px',
                  textAlign: 'left',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f4f4f4',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {file}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileList;
