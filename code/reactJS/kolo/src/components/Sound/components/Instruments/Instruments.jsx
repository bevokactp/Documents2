import React, { useState } from 'react';

// Import instrument classes
import { Cymbals } from './items/cymbals';
import { Drum } from './items/drum';
import { Flute } from './items/flute';
import { Gusli } from './items/gusli';
import { Hang } from './items/hang';
import { Harp } from './items/harp';
import { Kalimba } from './items/kalimba';
import { Organ } from './items/organ';
import { Piano } from './items/piano';
import { Trumpet } from './items/trumpet';
import { Ukulele } from './items/ukulele';
import { Vargan } from './items/vargan';
import { WaterInstrument } from './items/waterinstrument';
import { WindChime } from './items/windchime';

const instrumentList = [
  { name: 'Cymbals', Class: Cymbals },
  { name: 'Drum', Class: Drum },
  { name: 'Flute', Class: Flute },
  { name: 'Gusli', Class: Gusli },
  { name: 'Hang', Class: Hang },
  { name: 'Harp', Class: Harp },
  { name: 'Kalimba', Class: Kalimba },
  { name: 'Organ', Class: Organ },
  { name: 'Piano', Class: Piano },
  { name: 'Trumpet', Class: Trumpet },
  { name: 'Ukulele', Class: Ukulele },
  { name: 'Vargan', Class: Vargan },
  { name: 'WaterInstrument', Class: WaterInstrument },
  { name: 'WindChime', Class: WindChime },
];

const Instruments = () => {
  const [selectedInstrument, setSelectedInstrument] = useState(null);

  const handleSelectInstrument = (instrument) => {
    setSelectedInstrument(instrument);
  };

  const [widthCymbals, setWidthCymbals] = useState(10);
  const [heightCymbals, setHeightCymbals] = useState(20);
  const [lengthCymbals, setLengthCymbals] = useState(30);
  const [materialsCymbals, setMaterialsCymbals] = useState(['metal', 'wood']);
  const [weightCymbals, setWeightCymbals] = useState(300);
  const [colorsCymbals, setColorsCymbals] = useState(['gold', 'violet']);
  const [drumDiameterCymbals, setDrumDiameterCymbals] = useState(15);
  const [cymbals, setCymbals] = useState(null);

  const handleCalculateCymbals = () => {
    const cymbalsInstance = new Cymbals('', widthCymbals, heightCymbals, lengthCymbals, materialsCymbals, weightCymbals, colorsCymbals, drumDiameterCymbals);
    setCymbals(cymbalsInstance);
  };

  return (
    <div>
        <ul>
          {instrumentList.map((instrument, index) => (
            <li key={index} onClick={() => handleSelectInstrument(instrument)}> {instrument.name} </li>
          ))}
        </ul>

      {selectedInstrument && (
        <div>
          <h3>{selectedInstrument.name}</h3>
            {selectedInstrument.name === 'Cymbals' && (
              <>
                <button onClick={handleCalculateCymbals}>Calculate</button> <br />
                <label> WidthCymbals: <input type="number" value={widthCymbals} onChange={(e) => setWidthCymbals(Number(e.target.value))} /> </label> <br />
                <label> Height: <input type="number" value={heightCymbals} onChange={(e) => setHeightCymbals(Number(e.target.value))} /> </label> <br />
                <label> Length: <input type="number" value={lengthCymbals} onChange={(e) => setLengthCymbals(Number(e.target.value))} /> </label> <br />
                <label> Materials: <input type="text" value={materialsCymbals} onChange={(e) => setMaterialsCymbals(e.target.value)} /> </label> <br />
                <label> Weight: <input type="number" value={weightCymbals} onChange={(e) => setWeightCymbals(Number(e.target.value))} /> </label> <br />
                <label> Colors: <input type="text" value={colorsCymbals} onChange={(e) => setColorsCymbals(e.target.value)} /> </label> <br />
                <label> Drum diameter: <input type="number" value={drumDiameterCymbals} onChange={(e) => setDrumDiameterCymbals(Number(e.target.value))} /> </label>
                {cymbals && (
                  <div>
                    <p><strong>Frequency:</strong> {cymbals.calculateFrequency()}</p>
                    <p><strong>Volume:</strong> {cymbals.calculateVolume()}</p>
                    <p><strong>Classification:</strong> {cymbals.getClassification()}</p>
                  </div>
                )}
              </>
            )}


            {selectedInstrument.name === 'Drum' && (
              <>
              </>
            )}


        </div>
      )}
    </div>
  );
};

export default Instruments;
