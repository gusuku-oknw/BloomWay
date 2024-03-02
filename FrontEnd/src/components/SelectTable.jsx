import React, { useState } from 'react';

function SelectTable({ x, y, labels }) {
    const [selectedCell, setSelectedCell] = useState({ x: null, y: null });

    const handleCellClick = (row, col) => {
        setSelectedCell({ x: col, y: row });
        console.log(`Selected cell: Row ${row}, Col ${col}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex' }}>
                <div>
                    {/* Y-axis labels */}
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '4px' }}>
                        {Array.from({ length: y }).map((_, index) => (
                            <div key={index} style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {labels.find(label => label.y === index + 1)?.text || ''}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {/* Table cells */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {Array.from({ length: y }).map((_, row) => (
                            <div key={row} style={{ display: 'flex' }}>
                                {Array.from({ length: x }).map((__, col) => (
                                    <button key={col} style={{ width: '60px', height: '60px' }} onClick={() => handleCellClick(row + 1, col + 1)}>
                                        {row + 1},{col + 1}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* X-axis labels */}
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '4px' }}>
                        {Array.from({ length: x }).map((_, index) => (
                            <div key={index} style={{ width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', writingMode: 'vertical-lr' }}>
                                {labels.find(label => label.x === index + 1)?.text || ''}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Selected cell info */}
            {selectedCell.x && selectedCell.y && (
                <p style={{ marginTop: '20px' }}>選択されたセル: Row: {selectedCell.y}, Col: {selectedCell.x}</p>
            )}
        </div>
    );
}

export default SelectTable;
