import { LetterSymbol } from "./letter";

export class Sound {
    constructor({
        amplitude,
        articulation,
        intonation,
        duration,
        resonance,
        timbre,
        frequency,
        inhalationPronunciation,
        classification, // VowelClassification or ConsonantClassification
    }) {
        this.letter = null; // Will be set later
        this.amplitude = amplitude; // Amplitude of the sound
        this.articulation = articulation; // Articulation of the sound
        this.intonation = intonation; // Intonation of the sound
        this.duration = duration; // Duration of the sound
        this.resonance = resonance; // Resonance of the sound
        this.timbre = timbre; // Timbre of the sound
        this.frequency = frequency; // Frequency of the sound
        this.inhalationPronunciation = inhalationPronunciation; // [Inhalation, Exhalation]
        this.classification = classification; // Will be set based on type of sound
    }

    setLetter(letter) {
        if (!(letter instanceof LetterSymbol)) {
            throw new Error("letter must be Letter instance");
        }
        this.letter = letter;
    }

    play() {
        throw new Error("Not implemented.");
    }

    getTypeSound() {
        if (!this.classification) {
            throw new Error("Sound classification is not set.");
        }
        return this.classification instanceof VowelClassification ? 'Vowel' : 'Consonant';
    }

    getSoundInfo() {
        return this.frequency;
        return JSON.stringify({
            amplitude: this.amplitude,
            articulation: this.articulation,
            intonation: this.intonation,
            duration: this.duration,
            resonance: this.resonance,
            timbre: this.timbre,
            frequency: this.frequency,
            inhalationPronunciation: this.inhalationPronunciation,
            classification: this.classification
        }, null, 2); // Pretty-print the JSON
    }
}

export class VowelClassification {
    constructor({
        tenseness, // [Tense, Lax]
        placeOfArticulation, // [Open, Mid, Closed]
        height, // [High, Mid, Low]
        length, // [Short, Long]
        lipRoundness, // [Rounded, Unrounded]
        nasality // [Nasal, Non-nasal]
    }) {
        this.tenseness = tenseness;
        this.placeOfArticulation = placeOfArticulation;
        this.height = height;
        this.length = length;
        this.lipRoundness = lipRoundness;
        this.nasality = nasality;
    }
}

export class ConsonantClassification {
    constructor({
        length, // [Short, Long]
        placeOfArticulation, // Multiple selections
        voicing, // [Voiced, Voiceless]
        nasality, // [Nasal, Voiceless nasal]
        mannerOfArticulation, // Multiple selections
        specialType // Multiple selections
    }) {
        this.length = length;
        this.placeOfArticulation = placeOfArticulation;
        this.voicing = voicing;
        this.nasality = nasality;
        this.mannerOfArticulation = mannerOfArticulation;
        this.specialType = specialType;
    }
}
