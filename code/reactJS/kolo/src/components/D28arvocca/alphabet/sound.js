
export default class LetterSound {
    constructor(amplitude, articulation, intonation, duration, resonance, timbre, frequency, inhaleExhale, classification) {
        this.letter = null;
        this.amplitude = amplitude;
        this.articulation = articulation;
        this.intonation = intonation;
        this.duration = duration;
        this.resonance = resonance;
        this.timbre = timbre;
        this.frequency = frequency;
        this.inhaleExhale = inhaleExhale;
        this.classification = classification; // Полная классификация
    }

    setLetter(letter) {
        this.letter = letter;
    }

    play() {
        throw new Error("Method 'play()' must be implemented.");
    }

    getClassification() {
        return this.classification;
    }
}


export const classificationDetails = {
    vowels: {
        tension: ['tense', 'lax'],
        formation: ['open', 'mid', 'close'],
        height: ['high', 'mid', 'low'],
        length: ['short', 'long'],
        lipRoundness: ['rounded', 'unrounded'],
        nasal: ['nasal', 'oral'],
        is_tonal: false,
    },
    consonants: {
        length: ['short', 'long'],
        placeOfArticulation: {
            teeth: ['upper', 'lower'],
            is_alveolar: false,
            lips: ['upper', 'lower'],
            palate: ['soft', 'hard'],
            is_throat: false,
            tongue: {
                large: ['back', 'middle', 'front'],
                is_small: false,
            }
        },
        voicing: ['voiced', 'voiceless'],
        nasality: ['nasal', 'oral'],
        mannerOfArticulation: ['occlusive', 'fricative', 'affricate', 'sonorant', 'softened'],
        is_clicking: false,
        is_retroflex: false,
        is_pharyngeal: false,
        is_laryngeal: false,
        is_aspirated: false,
        is_implosive: false,
        is_ejective: false,
    },
    semiVowels: {},
};
