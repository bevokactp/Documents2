const SYMBOL_SIZE = 1; // Global size for symbols

export class Symbol {
    static symbolsKeys = [];

    constructor(key, name, color, description, group, drawFunction) {
        if (this.constructor === Symbol) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        if (Symbol.symbolsKeys.find(symbol => symbol.key === key)) {
            throw new Error("Symbol key must be unique.");
        }
        if (typeof drawFunction !== 'function') {
            throw new Error("Draw function must be a function.");
        }

        this.key = key;
        this.name = name;
        this.color = color;
        this.description = description;
        this.group = group;
        this.drawFunction = drawFunction;

        Symbol.symbolsKeys.push(this); // Add symbol to static array
    }

    draw(size = SYMBOL_SIZE) {
        // Call the provided draw function with size
        this.drawFunction(size);
    }
}

export class SymbolGroup {
    static groupsKeys = [];

    constructor(key, name, description) {
        if (SymbolGroup.groupsKeys.find(group => group.key === key)) {
            throw new Error("SymbolGroup key must be unique.");
        }

        this.key = key;
        this.name = name;
        this.description = description;
        this.symbols = [];

        SymbolGroup.groupsKeys.push(this); // Add group to static array
    }

    addSymbol(symbol) {
        if (!(symbol instanceof Symbol)) {
            throw new Error("The added object must be an instance of Symbol.");
        }
        this.symbols.push(symbol);
    }

    getSymbols() {
        return this.symbols;
    }
}

export class SymbolSubGroup {
    static subGroupsKeys = [];

    constructor(key, name, description) {
        if (SymbolSubGroup.subGroupsKeys.find(group => group.key === key)) {
            throw new Error("SymbolSubGroup key must be unique.");
        }

        this.key = key;
        this.name = name;
        this.description = description;
        this.symbols = [];

        SymbolSubGroup.subGroupsKeys.push(this); // Add group to static array
    }

    addSymbol(symbol) {
        if (!(symbol instanceof Symbol)) {
            throw new Error("The added object must be an instance of Symbol.");
        }
        this.symbols.push(symbol);
    }

    getSymbols() {
        return this.symbols;
    }
}
