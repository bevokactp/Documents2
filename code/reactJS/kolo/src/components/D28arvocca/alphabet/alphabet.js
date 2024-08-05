import { LetterSymbol, LetterGroup } from './letter';
import { PunctuationSymbol, PunctuationGroup } from './punctuation';
import { Operation, OperationGroup } from './operation';
import { GeometrySymbol, GeometryGroup } from './geometry';
import { MusicSymbol, MusicGroup } from './music';
import LetterSound from './sound';


export default class Alphabet {
    constructor() {
        this.groupsLettersSymbol = [];
        this.groupsPunctuationSymbol = [];
		this.groupsOperationsSymbol = [];
		this.groupsGeometrySymbol = [];
		this.groupsMusicSymbol = [];
    }

    createLetter(name, outline, color, classification, description, isUppercase, groupName, soundAttributes) {
        let group = this.groupsLettersSymbol.find(g => g.name === groupName);
        if (!group) {
            group = new LetterGroup(groupName, `Group for ${groupName}`);
            this.groupsLettersSymbol.push(group);
        }

        const sound = new LetterSound(
            soundAttributes.amplitude,
            soundAttributes.articulation,
            soundAttributes.intonation,
            soundAttributes.duration,
            soundAttributes.resonance,
            soundAttributes.timbre,
            soundAttributes.frequency,
            soundAttributes.inhaleExhale,
            soundAttributes.classificationDetails
        );

        const letter = new LetterSymbol(name, outline, color, classification, description, isUppercase, sound);
        sound.setLetter(letter);

        group.addLetter(letter);

        return letter;
    }

    createPunctuationSymbol(name, outline, color, value, groupName) {
        let group = this.groupsPunctuationSymbol.find(g => g.name === groupName);
        if (!group) {
            group = new PunctuationGroup(groupName, `Group for ${groupName}`);
            this.groupsPunctuationSymbol.push(group);
        }

        const punctuationSymbol = new PunctuationSymbol(name, outline, color, value, group);

        group.addSymbol(punctuationSymbol);

        return punctuationSymbol;
    }

	createOperation(name, outline, color, value, groupName) {
        let group = this.groupsOperationsSymbol.find(g => g.name === groupName);
        if (!group) {
            group = new OperationGroup(groupName, `Group for ${groupName}`);
            this.groupsOperationsSymbol.push(group);
        }

        const operation = new Operation(name, outline, color, value, group);
        group.addOperation(operation);

        return operation;
    }

	createGeometrySymbol(name, outline, color, value, groupName) {
        let group = this.groupsGeometrySymbol.find(g => g.name === groupName);
        if (!group) {
            group = new GeometryGroup(groupName, `Group for ${groupName}`);
            this.groupsGeometrySymbol.push(group);
        }

        const geometrySymbol = new GeometrySymbol(name, outline, color, value, group);
        group.addSymbol(geometrySymbol);

        return geometrySymbol;
    }

	createMusicSymbol(name, outline, color, value, groupName) {
        let group = this.groupsMusicSymbol.find(g => g.name === groupName);
        if (!group) {
            group = new MusicGroup(groupName, `Group for ${groupName}`);
            this.groupsMusicSymbol.push(group);
        }

        const musicSymbol = new MusicSymbol(name, outline, color, value, group);
        group.addSymbol(musicSymbol);

        return musicSymbol;
    }
}
