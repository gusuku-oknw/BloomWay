import React from 'react';
import { Div } from "atomize";

const ThankYou = () => {
    return (
        <Div
            bg="gray200"
            d="flex" // フレックスボックスを使用
            flexDir="column" // アイテムを縦方向に並べる
            align="center" // 水平方向の中央揃え
            justify="center" // 垂直方向の中央揃え
            textSize="display1"
            textWeight="500"
            textColor="info500"
            textAlign="center"
            p="1rem"
            h="100vh" // 高さをビューポートの100%に設定
        >
            ありがとうございます。<br />
            <Div
                justify="center"
                textSize="title"
            >
                フィードバックを受け付けました。
            </Div>
        </Div>
    );
};

export default ThankYou;
