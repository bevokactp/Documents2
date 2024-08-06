import { Symbol, SymbolGroup} from './symbol';


export class LetterSymbol extends Symbol {
    constructor(key, name, color, description, group, drawFunction, isUppercase, sound = {}) {
        super(key, name, color, description, group, drawFunction);
        this.isUppercase = isUppercase;
        this.sound = sound;
    }

    playSound() {
        this.sound.playSound();
    }

}


export class LetterGroup extends SymbolGroup {
}
