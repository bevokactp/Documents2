import { Symbol, SymbolGroup} from './symbol';

export class PunctuationSymbol extends Symbol {
    constructor(name, outline, color, value, group) {
        super(name, outline, color, group);
        this.value = value; // Значение символа (например, ",", ".", "!")
    }

    draw(size) {
        // Реализация метода рисования символа
    }
}


export class PunctuationGroup extends SymbolGroup  {
}
