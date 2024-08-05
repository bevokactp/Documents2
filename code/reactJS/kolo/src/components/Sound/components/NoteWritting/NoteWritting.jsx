import React, { useState } from 'react';
import AudioPlayer from './components/AudioPlayer';
import NoteButtons from './components/NoteButtons';
import NoteDisplay from './components/NoteDisplay';
import NoteInput from './components/NoteInput';
import NoteToAudioConverter from './components/NoteToAudioConverter';
import AudioToNoteConverter from './components/AudioToNoteConverter';
import './styles.css';


const App = () => {
  const [notes, setNotes] = useState([]);

  const handleNoteClick = (note) => {
    setNotes([...notes, note]);
  };
  const handleNoteSubmit = (note) => {
    setNotes([...notes, note]);
  };

  const handleNotesGenerated = (generatedNotes) => {
    setNotes(generatedNotes);
  };

  return (
    <div>
      <NoteButtons onNoteClick={handleNoteClick} />
      <NoteInput onNoteSubmit={handleNoteSubmit} />
      <NoteDisplay notes={notes} />
      <NoteToAudioConverter notes={notes} />
      <AudioToNoteConverter onNotesGenerated={handleNotesGenerated} />
    </div>
  );
};

export default App;
