import { LetterSymbol, LetterGroup } from './letter';
import { OperationSymbol, OperationSymbolGroup, OperationSymbolSubGroup } from './operation';
import { PunctuationSymbol, PunctuationGroup } from './punctuation';
import { GeometrySymbol, GeometryGroup } from './geometry';
import { MusicSymbol, MusicGroup } from './music';
import { Sound } from './sound';
import data from './alphabet.json';

export default class Alphabet {
    constructor() {
        this.groups = [];
        this.subGroups = [];
        this.symbols = [];
        this.createGroups();
        this.createGroupsAndSubGroupsOperations();
        this.createSymbols();
    }

    createGroups() {
        this.createLetterGroups();
        this.createPunctuationGroups();
        this.createMusicGroups();
        this.createGeometryGroups();
    }

    createSymbols() {
        this.createLetterSymbols();
        this.createOperationSymbols();
        this.createPunctuationSymbols();
        this.createGeometrySymbols();
        this.createMusicSymbols();
    }

    createLetterGroups() {
        data.letters.groups.forEach(groupData => {
            const group = new LetterGroup(groupData.keyGroup, groupData.name, groupData.description);
            this.groups.push(group);
        });
    }

    createPunctuationGroups() {
        data.punctuation.groups.forEach(groupData => {
            const group = new LetterGroup(groupData.keyGroup, groupData.name, groupData.description);
            this.groups.push(group);
        });
    }

    createGeometryGroups() {
        data.geometry.groups.forEach(groupData => {
            const group = new LetterGroup(groupData.keyGroup, groupData.name, groupData.description);
            this.groups.push(group);
        });
    }

    createMusicGroups() {
        data.music.groups.forEach(groupData => {
            const group = new LetterGroup(groupData.keyGroup, groupData.name, groupData.description);
            this.groups.push(group);
        });
    }

    createGroupsAndSubGroupsOperations() {
        data.operations.groups.forEach(groupData => {
            const group = new OperationSymbolGroup(groupData.keyGroup, groupData.name, groupData.description);
            if (groupData.subGroups) {
                groupData.subGroups.forEach(subGroupData => {
                    const subGroup = new OperationSymbolSubGroup(subGroupData.keySubGroup, subGroupData.name, subGroupData.description);
                    this.subGroups.push(subGroup);
                });
            }
            this.groups.push(group);
        });
    }

    createLetterSymbols() {
        const letterData = data.letters.groups;
        letterData.forEach(groupData => {
            const group = this.groups.find(g => g.key === groupData.keyGroup);
            const sound = this.createSoundForLetter();
            groupData.symbols.forEach(symbolData => {
                const letter = new LetterSymbol(
                    symbolData.keySymbol,
                    symbolData.name,
                    symbolData.color,
                    symbolData.description,
                    group,
                    this.createDrawFunction(symbolData.name), // Assuming a draw function is needed
                    symbolData.name.toUpperCase() === symbolData.name, // Simple check for uppercase
                    sound,
                );
                sound.setLetter(letter)
                group.addSymbol(letter);
                this.symbols.push(letter);
            });
        });
    }

    createOperationSymbols() {
        data.operations.groups.forEach(groupData => {
            if (groupData.subGroups) {
                groupData.subGroups.forEach(subGroupData => {
                    let subGroup = this.subGroups.find(g => g.key === groupData.subGroups.keySubGroup);
                    // console.log(subGroup, groupData.subGroups.keySubGroup)
                    subGroupData.symbols.forEach(symbolData => {
                        const symbol = new OperationSymbol(
                            symbolData.keySymbol,
                            symbolData.name,
                            symbolData.color,
                            symbolData.description,
                            subGroup,
                            this.createDrawFunction(symbolData.name), // Assuming a draw function is needed
                        );
                        // subGroup.addSymbol(symbol);
                        this.symbols.push(symbol);
                    });
                });
            } else {
                let group = this.groups.find(g => g.key === groupData.keyGroup);
                groupData.symbols.forEach(symbolData => {
                const symbol = new OperationSymbol(
                    symbolData.keySymbol,
                    symbolData.name,
                    symbolData.color,
                    symbolData.description,
                    group,
                    this.createDrawFunction(symbolData.name), // Assuming a draw function is needed
                );
                group.addSymbol(symbol);
                this.symbols.push(symbol);
            });
            }
        });
    }

    createPunctuationSymbols() {
        const letterData = data.punctuation.groups;
        letterData.forEach(groupData => {
            const group = this.groups.find(g => g.key === groupData.keyGroup);
            groupData.symbols.forEach(symbolData => {
                const symbol = new PunctuationSymbol(
                    symbolData.keySymbol,
                    symbolData.name,
                    symbolData.color,
                    symbolData.description,
                    group,
                    this.createDrawFunction(symbolData.name), // Assuming a draw function is needed
                    symbolData.name.toUpperCase() === symbolData.name, // Simple check for uppercase
                    this.createSoundForLetter(symbolData.name) // Create sound if needed
                );
                group.addSymbol(symbol);
                this.symbols.push(symbol);
            });
        });
    }

    createGeometrySymbols() {
        const letterData = data.geometry.groups;
        letterData.forEach(groupData => {
            const group = this.groups.find(g => g.key === groupData.keyGroup);
            groupData.symbols.forEach(symbolData => {
                const symbol = new GeometrySymbol(
                    symbolData.keySymbol,
                    symbolData.name,
                    symbolData.color,
                    symbolData.description,
                    group,
                    this.createDrawFunction(symbolData.name), // Assuming a draw function is needed
                    symbolData.name.toUpperCase() === symbolData.name, // Simple check for uppercase
                    this.createSoundForLetter(symbolData.name) // Create sound if needed
                );
                group.addSymbol(symbol);
                this.symbols.push(symbol);
            });
        });
    }

    createMusicSymbols() {
        const letterData = data.music.groups;
        letterData.forEach(groupData => {
            const group = this.groups.find(g => g.key === groupData.keyGroup);
            groupData.symbols.forEach(symbolData => {
                const symbol = new MusicSymbol(
                    symbolData.keySymbol,
                    symbolData.name,
                    symbolData.color,
                    symbolData.description,
                    group,
                    this.createDrawFunction(symbolData.name), // Assuming a draw function is needed
                    symbolData.name.toUpperCase() === symbolData.name, // Simple check for uppercase
                    this.createSoundForLetter(symbolData.name) // Create sound if needed
                );
                group.addSymbol(symbol);
                this.symbols.push(symbol);
            });
        });
    }


    createDrawFunction(name) {
        // Need implement. Generate draw_function_name_for_each
        return (size) => {
            console.log(`Drawing ${name} with size ${size}`);
        };
    }

    createSoundForLetter() {
        return new Sound({
            amplitude: 1,
            articulation: 'none',
            intonation: 'neutral',
            duration: 'short',
            resonance: 'none',
            timbre: 'neutral',
            frequency: 432,
            inhalationPronunciation: 'Exhalation',
            classification: {} // Provide appropriate classification
        });
    }
}
