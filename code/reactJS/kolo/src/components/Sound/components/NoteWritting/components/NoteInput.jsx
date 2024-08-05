import React, { useState } from 'react';

const NoteInput = ({ onNoteSubmit }) => {
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNoteSubmit(note);
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter note (e.g., C4, D#4)"
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteInput;
