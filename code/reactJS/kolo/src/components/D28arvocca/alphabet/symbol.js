
export class Symbol {
    constructor(name, outline, color, description, group) {
        if (this.constructor === Symbol) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.name = name;
        this.outline = outline;
        this.color = color;
        this.description = description;
        this.group = group;
    }

    draw(size) {
        throw new Error("Method 'draw()' must be implemented.");
    }
}


export class SymbolGroup {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.symbols = [];
    }

    addSymbol(symbol) {
        this.symbols.push(symbol);
    }

    getSymbols() {
        return this.symbols;
    }
}
