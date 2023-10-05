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
      {/* <button onClick={() => handleContentChange('予約可能')} style={buttonStyle}>予約可能</button> */}
      <button onClick={() => handleContentChange('予約済')} style={buttonStyle}>予約済</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const Calendar = () => {
  const CONTENT_COLOR_MAP = {
    '予約可能': '#E65032',
    '予約済': '#53B09A',
    '休業': '#A8A7A7'
  };

  const [cells, setCells] = useState([
    [{ color: CONTENT_COLOR_MAP['予約可能'], content: '予約可能' }, { color: CONTENT_COLOR_MAP['予約可能'], content: '予約可能' },{ color: '#A8A7A7', content: '休業' }, { color: '#A8A7A7', content: '休業' }, { color: '#A8A7A7', content: '休業' }],
    [{ color: CONTENT_COLOR_MAP['休業'], content: '休業' }, { color: CONTENT_COLOR_MAP['予約済'], content: '予約済' }],
    [{ color: CONTENT_COLOR_MAP['休業'], content: '休業' }, ],
    [{ color: CONTENT_COLOR_MAP['予約可能'], content: '予約可能' }, { color: CONTENT_COLOR_MAP['予約可能'], content: '予約可能' },{ color: '#A8A7A7', content: '休業' }, { color: '#A8A7A7', content: '休業' }, { color: '#A8A7A7', content: '休業' }, { color: '#A8A7A7', content: '休業' }, { color: '#A8A7A7', content: '休業' }],
    [{ color: CONTENT_COLOR_MAP['予約可能'], content: '予約可能' }, { color: CONTENT_COLOR_MAP['予約可能'], content: '予約可能' },{ color: '#A8A7A7', content: '休業' }, { color: '#A8A7A7', content: '休業' }, { color: '#A8A7A7', content: '休業' }],
    [{ color: CONTENT_COLOR_MAP['予約済'], content: '予約済' }]
  ]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  useEffect(() => {
    // カレンダーが5x5になるようにセル情報を埋める
    const filledCells = [...cells];
    while (filledCells.length < 8) {
      const newRow = Array(7).fill({ color: CONTENT_COLOR_MAP['予約可能'], content: '予約可能' });
      filledCells.push(newRow);
    }
    filledCells.forEach(row => {
      while (row.length < 7) {
        row.push({ color: CONTENT_COLOR_MAP['予約可能'], content: '予約可能' });
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
  while (cells.length < 4) {
    const newRow = Array(7).fill({ color: CONTENT_COLOR_MAP['休業'], content: '休業' });
    cells.push(newRow);
  }

  const marginpx = '2px'
  const cellStyle = {
    fontSize: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
    width: 77.34,
    height: 50,
    margin: '1px',
    marginLeft: 0,
    borderRadius: 3,
    cursor: 'pointer',
};

  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{width: '90%', height: '100%', paddingBottom: 5, background: '#ffffff', borderRadius: 10, overflow: 'hidden', border: '1px white solid', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', flexWrap: 'wrap'}}>
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
