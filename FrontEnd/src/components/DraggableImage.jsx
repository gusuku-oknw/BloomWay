import React, { useState } from 'react';

const DraggableImage = ({ onDragStart, onDragEnd }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const dragStart = (e) => {
        // クリックされた位置から要素の左上隅までのオフセットを計算
        const elemRect = e.target.getBoundingClientRect();
        const offsetX = e.clientX - elemRect.left;
        const offsetY = e.clientY - elemRect.top;

        // ドラッグ開始の処理
        // setDragging(true);
        onDragStart();

        // マウスが動いたときのイベント
        const onMouseMove = (moveEvent) => {
            // 新しい位置を設定
            setPosition({
                x: moveEvent.clientX - offsetX,
                y: moveEvent.clientY - offsetY,
            });
        };

        // マウスボタンを離したときのイベント
        const onMouseUp = () => {
            // ドラッグ終了の処理
            setDragging(false);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            onDragEnd();
        };

        // ドキュメントにイベントリスナーを追加
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: 'grab',
            }}
            onMouseDown={dragStart}
        >
            {/* 画像のソースを指定し、draggable属性をfalseに設定 */}
            <img src="path-to-your-image.jpg" alt="Draggable" draggable="false" />
        </div>
    );
};

export default DraggableImage;
