import { useState } from 'react';
import { analyzeText } from '../services/analysisService';

const useTextAnalysis = () => {
    const [analysisResult, setAnalysisResult] = useState(null);

    const analyze = (text) => {
        const result = analyzeText(text);
        setAnalysisResult(result);
    };

    return { analysisResult, analyze };
};

export default useTextAnalysis;
