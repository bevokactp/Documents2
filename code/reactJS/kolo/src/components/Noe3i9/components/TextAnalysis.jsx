import React, { useState } from 'react';
import { analyzeText } from '../services/analysisService';

const TextAnalysis = () => {
    const [text, setText] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalyze = () => {
        const result = analyzeText(text);
        setAnalysisResult(result);
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст"
            />
            <button onClick={handleAnalyze}>Анализировать</button>
            {analysisResult && <div>Результат анализа: {JSON.stringify(analysisResult)}</div>}
        </div>
    );
};

export default TextAnalysis;
