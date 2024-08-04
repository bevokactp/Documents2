const assert = require('assert');

const { greet, add, obj, Person } = require('../1');

describe('Demo functions', () => {
    test('greet function', () => {
        expect(greet('Jane')).toBe('Hello, Jane!');
    });

    test('add function', () => {
        expect(add(2, 2)).toBe(4);
    });
    test('obj getName', () => {
        expect(add(2, 2)).toBe(4);
    });
});

test('getName function should return correct name', () => {
    expect(obj.getName()).toBe('name is John');
});

test('getName function should not modify the object', () => {
    const originalObj = { ...obj };
    obj.getName();
    expect(obj).toEqual(originalObj);
});

test('getName function should return correct name after multiple calls', () => {
    expect(obj.getName()).toBe('name is John');
    expect(obj.getName()).toBe('name is John');
    expect(obj.getName()).toBe('name is John');
});

test('getName function should not modify the object after multiple calls', () => {
    const originalObj = { ...obj };
    obj.getName();
    obj.getName();
    obj.getName();
    expect(obj).toEqual(originalObj);
});

test('getName function should not affect other properties of the object', () => {
    expect(obj.getName()).toBe('name is John');
    expect(obj.age).toBe(30);
});


describe('Person class', () => {
    describe('getName function', () => {
        it('should return correct name for John', () => {
            const person = new Person('John', 30);
            assert.strictEqual(person.getName(), 'name is John');
        });

        it('should return correct name for Jane', () => {
            const person = new Person('Jane', 25);
            assert.strictEqual(person.getName(), 'name is Jane');
        });

        it('should return correct name for empty string', () => {
            const person = new Person('', 0);
            assert.strictEqual(person.getName(), 'name is ');
        });

        it('should return correct name for special characters', () => {
            const person = new Person('!@#$%^&*', 100);
            assert.strictEqual(person.getName(), 'name is !@#$%^&*');
        });

        it('should return correct name for numbers', () => {
            const person = new Person('1234567890', 50);
            assert.strictEqual(person.getName(), 'name is 1234567890');
        });
    });
    test('Person class', () => {
        const person = new Person('John', 30);
        expect(person.name).toBe('John');
        expect(person.age).toBe(30);
        expect(person.getName()).toBe('name is John');
    });
});