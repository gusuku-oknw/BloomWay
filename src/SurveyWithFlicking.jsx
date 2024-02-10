import React, { useState, useRef } from 'react';
import { Div, Button } from "atomize";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

export default function SurveyWithFlicking() {
    const [panels] = useState([
        { question: "質問1", options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"] },
        { question: "質問2", options: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"] },
        { question: "質問3", options: ["選択肢X", "選択肢Y", "選択肢Z", "選択肢W"] },
    ]);

    const flickingRef = useRef(null);

    const moveToNextPanel = () => {
        const flicking = flickingRef.current;
        if (flicking) {
            const nextIndex = flicking.index + 1;
            if (nextIndex < panels.length) {
                flicking.moveTo(nextIndex).catch(e => console.error("Failed to move:", e));
            } else {
                // アンケート終了後の処理
                alert("アンケート終了！");
            }
        }
    };

    return (
        <Flicking
            ref={flickingRef}
            align="prev"
            circular={false}
            onMoveEnd={e => {
                console.log("Moved to panel", e.index);
            }}>
            {panels.map((panel, index) => (
                <Div
                    w='85vw'
                    p={{ t: "2rem", b: "2rem" }}
                    d="flex"
                    flexDir="column"
                    align="center"
                    justify="start"
                    key={index}>
                    <h2 style={{ width: '100%', textAlign: 'center', marginBottom: '2rem' }}>{panel.question}</h2>
                    <Div
                        d="flex"
                        flexWrap="wrap"
                        justify="space-around"
                        align="center"
                        w="100%">
                        {panel.options.map((option, optionIndex) => (
                            <Button
                                key={optionIndex}
                                onClick={moveToNextPanel}
                                bg="info700"
                                hoverBg="info600"
                                rounded="md"
                                m={{ b: "1rem", r: "0.5rem", l: "0.5rem" }}
                                p={{ x: "1.5rem", y: "1.5rem" }}
                                w="calc(50% - 1rem)" // 2 columns layout
                            >
                                {/*<img src="your-image-url-here" alt="Option" style={{ width: '100%', height: 'auto', marginBottom: '1rem' }} />*/}
                                {option}
                            </Button>
                        ))}
                    </Div>
                </Div>
            ))}
        </Flicking>
    );
}
