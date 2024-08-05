import React, { useState } from 'react';
import { generateText } from '../services/textGenerationService';

const RhymeGenerator = () => {
    const [rhymeScheme, setRhymeScheme] = useState('');
    const [meter, setMeter] = useState('');
    const [generatedText, setGeneratedText] = useState('');

    const handleGenerate = () => {
        const text = generateText(rhymeScheme, meter);
        setGeneratedText(text);
    };

    return (
        <div>
            <input
                type="text"
                value={rhymeScheme}
                onChange={(e) => setRhymeScheme(e.target.value)}
                placeholder="Введите рифмовку"
            />
            <input
                type="text"
                value={meter}
                onChange={(e) => setMeter(e.target.value)}
                placeholder="Введите метр"
            />
            <button onClick={handleGenerate}>Сгенерировать текст</button>
            {generatedText && <div>Сгенерированный текст: {generatedText}</div>}
        </div>
    );
};

export default RhymeGenerator;
