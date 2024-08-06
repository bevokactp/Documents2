export default class NumberSystem {
    constructor() {
        this.systems = [2, 8, 10, 12, 16, 40, 60, 108];
        this.baseSymbols = {
            2: '01',
            8: '01234567',
            10: '0123456789',
            12: '0123456789AB',
            16: '0123456789ABCDEF',
            40: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcd',
            60: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx',
            108: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzйцукенгшщзхїфівапролджєячсмитьбюЙЦУКЕНГШЩЗЗХЇФ'
        };
    }

    convertNumber(number) {
        const results = {};

        for (let base of this.systems) {
            results[base] = this.convertToBase(number, base);
        }

        return results;
    }

    convertToBase(number, base) {
        const symbols = this.getBaseSymbols(base);
        if (!symbols) {
            throw new Error(`Base ${base} is not supported.`);
        }

        if (number === 0) {
            return symbols[0];
        }

        let result = '';
        let num = number;

        while (num > 0) {
            result = symbols[num % base] + result;
            num = Math.floor(num / base);
        }

        return result;
    }

    getBaseSymbols(base) {
        return this.baseSymbols[base] || '';
    }
}
