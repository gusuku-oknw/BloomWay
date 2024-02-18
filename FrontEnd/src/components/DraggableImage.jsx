import React, { useState, useEffect } from 'react';
import { Div } from "atomize";

function DraggableImage({ onDragStart, onDragEnd }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [relPosition, setRelPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) return;
            setPosition({
                x: e.clientX - relPosition.x,
                y: e.clientY - relPosition.y,
            });
        };

        const handleMouseUp = () => {
            setDragging(false);
            onDragEnd(); // ドラッグ終了時に親コンポーネントへ通知
        };

        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, relPosition.x, relPosition.y, onDragEnd]);

    const onMouseDown = (e) => {
        // ドラッグ開始時に親コンポーネントへ通知
        onDragStart();
        // ドラッグ開始処理
        setDragging(true);
        setRelPosition({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        e.preventDefault();
    };

    return (
        <Div
            onMouseDown={onMouseDown}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <img
                src="" // 画像のURLを設定
                className="draggableImage"
                style={{
                    position: 'absolute',
                    cursor: 'move',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
                alt="Draggable"
            />
        </Div>
    );
}

export default DraggableImage;
