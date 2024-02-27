import React from 'react';
import { Div, Button } from "atomize";

const SelectTable = ({ x, y }) => {
    // セルをクリックした時のハンドラー
    const handleCellClick = (rowIndex, colIndex) => {
        console.log(`Row: ${rowIndex}, Col: ${colIndex}`);
    };

    // 表の行を生成
    const renderRows = () => {
        let rows = [];
        for (let rowIndex = 0; rowIndex < y; rowIndex++) {
            let cells = [];
            for (let colIndex = 0; colIndex < x; colIndex++) {
                cells.push(
                    <td key={`${rowIndex}-${colIndex}`}>
                        <Button onClick={() => handleCellClick(rowIndex, colIndex)}>
                            {/*{rowIndex},{colIndex}*/}
                        </Button>
                    </td>
                );
            }
            rows.push(<tr key={rowIndex}>{cells}</tr>);
        }
        return rows;
    };

    return (
        <table>
            <tbody>{renderRows()}</tbody>
        </table>
    );
}

export default SelectTable;
