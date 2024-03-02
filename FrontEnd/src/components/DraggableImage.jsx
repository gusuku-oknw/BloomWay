import React, { useState } from 'react';
import { Div } from "atomize";
import point from "./point.svg";

const DraggableImage = ({ onDragStart, onDragEnd }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const dragStart = (e) => {
        const elemRect = e.target.getBoundingClientRect();
        // 画像の中心を計算するために幅と高さの半分を取得
        const centerX = elemRect.width / 2;
        const centerY = elemRect.height / 2;

        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

        // 中心からのオフセットを計算
        const offsetX = clientX - elemRect.left - centerX;
        const offsetY = clientY - elemRect.top - centerY;

        onDragStart();

        const onMove = (moveEvent) => {
            const moveX = moveEvent.type.includes('mouse') ? moveEvent.clientX : moveEvent.touches[0].clientX;
            const moveY = moveEvent.type.includes('mouse') ? moveEvent.clientY : moveEvent.touches[0].clientY;

            // 画像を中心に設定するために、オフセットを引きます
            setPosition({
                x: moveX - offsetX - centerX,
                y: moveY - offsetY - centerY,
            });
        };

        const onEnd = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
            onDragEnd();
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
    };

    return (
        <Div
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: 'grab',
            }}
            onMouseDown={dragStart}
            onTouchStart={dragStart}
        >
            <img
                src={point}
                alt="Draggable"
                draggable="false"
                style={{ width: '100px', height: '100px' }} // 画像のサイズ指定
            />
        </Div>
    );
};

export default DraggableImage;
