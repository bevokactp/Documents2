import React from 'react';

const NoteButtons = ({ onNoteClick }) => {
  const notes = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4", "c/5"];

  return (
    <div>
      {notes.map(note => (
        <button key={note} onClick={() => onNoteClick(note)}>
          {note}
        </button>
      ))}
    </div>
  );
};

export default NoteButtons;
