import React, { useState } from 'react';
import { convertAudioToNotes } from '../services/audioProcessing';

const AudioToNoteConverter = ({ onNotesGenerated }) => {
  const [audioFile, setAudioFile] = useState(null);

  const handleChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    const notes = await convertAudioToNotes(audioFile);
    onNotesGenerated(notes);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="audio/*" />
      <button onClick={handleConvert}>Convert Audio to Notes</button>
    </div>
  );
};

export default AudioToNoteConverter;
