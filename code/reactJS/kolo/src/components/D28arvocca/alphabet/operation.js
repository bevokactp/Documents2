import { Symbol, SymbolGroup} from './symbol';


export class OperationSymbol extends Symbol {
    constructor(name, outline, color, value, group) {
        super(name, outline, color, group);
        this.value = value;
    }

    draw(size) {
        throw new Error("Method 'draw()' must be implemented.");
    }
}


export class OperationSymbolGroup extends SymbolGroup {
}
