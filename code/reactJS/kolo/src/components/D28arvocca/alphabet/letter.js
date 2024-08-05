import { Symbol, SymbolGroup} from './symbol';


export class LetterSymbol extends Symbol {
    constructor(name, outline, color, classification, description, isUppercase, group, sound) {
        super(name, outline, color, classification, description);
        this.isUppercase = isUppercase;
        this.group = group;
        this.sound = sound;
    }


    draw(size) {
    }

    playSound() {
        this.sound.playSound();
    }
}


export class LetterGroup extends SymbolGroup {
}
