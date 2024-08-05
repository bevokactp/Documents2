import React, { useState } from 'react';
import { convertNotesToAudio } from '../services/noteConversion';

const NoteToAudioConverter = ({ notes }) => {
  const [audioSrc, setAudioSrc] = useState(null);

  const handleConvert = async () => {
    const audioData = await convertNotesToAudio(notes);
    setAudioSrc(URL.createObjectURL(audioData));
  };

  return (
    <div>
      <button onClick={handleConvert}>Convert Notes to Audio</button>
      {audioSrc && <audio controls src={audioSrc}></audio>}
    </div>
  );
};

export default NoteToAudioConverter;
