import React, { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

const NoteDisplay = ({ notes }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const VF = {
      Renderer,
      Stave,
      StaveNote,
      Voice,
      Formatter
    };

    const div = containerRef.current;
    div.innerHTML = ''; // Очистка содержимого перед перерисовкой
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

    const stave = new VF.Stave(10, 40, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw();

    const vexNotes = notes.map(note => new VF.StaveNote({
      clef: "treble",
      keys: [note],
      duration: "q"
    }));

    const totalBeats = 4; // Например, 4 такта
    const remainingBeats = totalBeats - vexNotes.length;

    // Добавляем паузы, если необходимо
    for (let i = 0; i < remainingBeats; i++) {
      vexNotes.push(new VF.StaveNote({
        clef: "treble",
        keys: ["b/4"], // Вставляем паузу
        duration: "q",
        rest: true
      }));
    }

    const voice = new VF.Voice({ num_beats: totalBeats, beat_value: 4 });
    voice.addTickables(vexNotes);

    new VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
  }, [notes]);

  return <div ref={containerRef}></div>;
};

export default NoteDisplay;
