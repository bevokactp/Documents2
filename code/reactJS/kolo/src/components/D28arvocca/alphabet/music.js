import { Symbol, SymbolGroup } from './symbol';

export class MusicSymbol extends Symbol {
    constructor(name, outline, color, value, group) {
        super(name, outline, color, group);
        this.value = value; // Value of the music symbol (e.g., "Whole Note", "Sharp")
    }

    draw(size) {
        // Implementation for drawing the music symbol
    }
}

export class MusicGroup extends SymbolGroup {
}
