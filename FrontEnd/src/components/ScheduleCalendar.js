import React, { useState, useEffect, useRef } from 'react';

const PopupMenu = ({ onClose, onContentChange }) => {
  const popupRef = useRef(null); // Create a ref
  useEffect(() => {
    // Define the click handler
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Attach the click handler
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const pupupStyle = {
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '9rem',
    borderRadius: '1rem',
    zIndex: 1000
  }
  const buttonStyle = {
    width: '100px',
    height: '40px',
    borderradius: '5px',
    border: 'none',
    padding: '0 16px',
    borderRadius: 8,
    color: '#fff',
    background: '#639',
  }

  const handleContentChange = (content) => {
    onContentChange(content);
    onClose();
  };

  return (
    <div style={pupupStyle} ref={popupRef}>
      {/* <button onClick={() => handleContentChange('講義')} style={buttonStyle}>講義</button> */}
      <button onClick={() => handleContentChange('バイト')} style={buttonStyle}>バイト</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const Calendar = () => {
  const [cells, setCells] = useState([
    [{ color: '#E65032', content: '講義' }, { color: '#E65032', content: '講義' },{ color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }],
    [{ color: '#A8A7A7', content: 'NULL' }, { color: '#53B09A', content: 'バイト' }],
    [{ color: '#A8A7A7', content: 'NULL' }, { color: '#53B09A', content: 'バイト' }],
    [{ color: '#E65032', content: '講義' }, { color: '#E65032', content: '講義' },{ color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }],
    [{ color: '#E65032', content: '講義' }, { color: '#E65032', content: '講義' },{ color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }, { color: '#A8A7A7', content: 'NULL' }],
  ]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  const CONTENT_COLOR_MAP = {
    '講義': '#E65032',
    'バイト': '#53B09A',
    'NULL': '#A8A7A7'
  };

  useEffect(() => {
    // カレンダーが5x5になるようにセル情報を埋める
    const filledCells = [...cells];
    while (filledCells.length < 5) {
      const newRow = Array(5).fill({ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' });
      filledCells.push(newRow);
    }
    filledCells.forEach(row => {
      while (row.length < 5) {
        row.push({ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' });
      }
    });
    setCells(filledCells);
  }, []);

  const handleCellClick = (rowIndex, cellIndex) => {
    // セルの行と列の情報をバックエンドに送信
    fetch('/process_cell_info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rowIndex, cellIndex }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedCell({ rowIndex, cellIndex });
        setPopupVisible(true);
      })
      .catch((error) => {
        console.error('エラー:', error);
      });
    };

    const handleContentChange = (content) => {
      const color = CONTENT_COLOR_MAP[content];
      const newCells = cells.map((row, rIndex) => {
        return row.map((cell, cIndex) => {
          if (rIndex === selectedCell.rowIndex && cIndex === selectedCell.cellIndex) {
            return { ...cell, content: content, color: color };
          }
          return cell;
        });
      });
      setCells(newCells);
    };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // カレンダーが5x5になるようにセル情報を埋める
  while (cells.length < 5) {
    const newRow = Array(5).fill({ color: CONTENT_COLOR_MAP['NULL'], content: 'NULL' });
    cells.push(newRow);
  }

  const marginpx = '2px'
  const cellStyle = {
    flex: '1',
    width: 77.34,
    height: 103,
    margin: '1px',
    marginLeft: 0, // 最初のセルの左側のマージンを0に設定
    borderRadius: 3,
    cursor: 'pointer',
  };
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{width: '90%', height: '100%', paddingBottom: 10, background: '#ffffff', borderRadius: 30, overflow: 'hidden', border: '1px white solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', flexWrap: 'wrap'}}>
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: rowIndex === 0 ? 0 : marginpx }}>
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                style={{
                  ...cellStyle,
                  marginLeft: cellIndex === 0 ? 0 : marginpx,
                  background: cell.color,
                }}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              >
                {cell.content}
              </div>
            ))}
          </div>
        ))}
        {popupVisible && <PopupMenu onClose={closePopup} onContentChange={handleContentChange} />}
      </div>
      <div style={{ height: '700px', background: '#000000' }}></div> {/* 新しく追加したdivで下に余白を設定 */}
    </div>
  );
  
}
export default Calendar;
