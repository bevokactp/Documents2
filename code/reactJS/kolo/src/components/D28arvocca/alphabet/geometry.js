import { Symbol, SymbolGroup } from './symbol';


export class GeometrySymbol extends Symbol {
    constructor(name, outline, color, value, group) {
        super(name, outline, color, group);
        this.value = value;
    }
    draw(size) {
    }
}


export class GeometryGroup extends SymbolGroup {
}
