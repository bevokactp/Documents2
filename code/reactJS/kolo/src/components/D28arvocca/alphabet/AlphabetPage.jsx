import React from 'react';
import Alphabet from './alphabet'; // Adjust the path as needed
import { LetterSymbol } from './letter'; // Adjust the path as needed

const alphabetInstance = new Alphabet(); // Create an instance of the Alphabet class

const SymbolGroupList = ({ groups }) => (
    <div>
        {groups.map((group) => (
            <div key={group.key} style={{ marginBottom: '20px' }}>
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <ul>
                    {group.getSymbols().map((symbol) => (
                        <li key={symbol.key} style={{ color: symbol.color }}>
                            <strong>{symbol.name}</strong>: {symbol.description}
                            {symbol instanceof LetterSymbol && (
                                <div>
                                    <p>Sound: {symbol.sound.getSoundInfo()}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);

const SymbolTable = ({ symbols }) => {
    // Sort symbols by their keys
    const sortedSymbols = symbols.sort((a, b) => a.key - b.key);

    return (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Description</th>
                    <th>Group Name</th>
                    <th>Sound</th>
                </tr>
            </thead>
            <tbody>
                {sortedSymbols.map((symbol) => (
                    <tr key={symbol.key}>
                        <td>{symbol.key}</td>
                        <td>{symbol.name}</td>
                        <td style={{ backgroundColor: symbol.color }}>{symbol.color}</td>
                        <td>{symbol.description}</td>
                        <td>{symbol.group.name}</td>
                        <td>{symbol instanceof LetterSymbol ? symbol.sound.getTypeSound() : ''}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const AlphabetComponent = () => {
    const { groups, subGroups, symbols } = alphabetInstance;

    // const allSymbols = [
    //     ...groups.music.flatMap(group => group.getSymbols()),
    //     ...groups.geometry.flatMap(group => group.getSymbols()),
    //     ...groups.punctuation.flatMap(group => group.getSymbols()),
    //     ...groups.operation.flatMap(group => group.getSymbols()),
    //     ...groups.letter.flatMap(group => group.getSymbols())
    // ];

    return (
        <div>
            <div>
                <p>Groups: {groups.length} {groups.map(k => `${k.name}, `)}</p>
                <p>subGroups: {subGroups.length} {subGroups.map(k => `${k.name}, `)}</p>
                <p>symbols: {symbols.length} {symbols.map(k => `${k.name}, `)}</p>
                {/* <h1>Letter Symbols</h1>
                <SymbolGroupList groups={groups.letter} />

                <h1>Music Symbols</h1>
                <SymbolGroupList groups={groups.music} />

                <h1>Geometry Symbols</h1>
                <SymbolGroupList groups={groups.geometry} />

                <h1>Punctuation Symbols</h1>
                <SymbolGroupList groups={groups.punctuation} />

                <h1>Operation Symbols</h1>
                <SymbolGroupList groups={groups.operation} /> */}
            </div>
            <div>
                {/* <SymbolTable symbols={allSymbols} /> */}
            </div>
        </div>
    );
};

export default AlphabetComponent;
