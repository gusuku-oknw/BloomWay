import React, { useState, useRef } from 'react';
import { Div, Button } from "atomize";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

import FinalSurvey from "./FinalSurvey";

export default function ChoicesWithFlicking() {
    const [panels, setPanels] = useState([
        { question: "質問1", options: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"], selectedOptionIndex: null },
        { question: "質問2", options: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"], selectedOptionIndex: null },
        { question: "質問3", options: ["選択肢X", "選択肢Y", "選択肢Z", "選択肢W"], selectedOptionIndex: null },
    ]);

    const [isSurveyFinished, setIsSurveyFinished] = useState(false);

    const flickingRef = useRef(null);

    const moveToNextPanel = (panelIndex, optionIndex) => {
        const updatedPanels = panels.map((panel, idx) => {
            if (idx === panelIndex) {
                return { ...panel, selectedOptionIndex: optionIndex };
            }
            return panel;
        });

        setPanels(updatedPanels);

        const flicking = flickingRef.current;
        if (flicking) {
            const nextIndex = flicking.index + 1;
            if (nextIndex < panels.length) {
                flicking.moveTo(nextIndex).catch(e => console.error("Failed to move:", e));
            } else {
                setIsSurveyFinished(true); // ここで状態を更新
            }
        }
    };

    if (isSurveyFinished) {
        return <FinalSurvey onSubmit={(data) => console.log(data)} />;
    }

    return (
        <Flicking
            ref={flickingRef}
            align="center"
            circular={false}
            bounce="0" bound={true}
            onMoveEnd={e => {
                console.log("Moved to panel", e.index);
            }}>
            {panels.map((panel, panelIndex) => (
                // 外側のDivにマージンを追加して隙間を作成
                <Div
                    w='85vw'
                    m="1rem"
                >
                    <Div
                        bg="info200"
                        rounded="lg"
                        w='85vw'
                        h='50vw'
                        p={{ t: "2rem", b: "2rem" }}
                        d="flex"
                        flexDir="column"
                        align="center"
                        justify="start"
                        key={panelIndex}>
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
                                    onClick={() => moveToNextPanel(panelIndex, optionIndex)}
                                    bg={panel.selectedOptionIndex === optionIndex ? "success700" : "info700"}
                                    hoverBg={panel.selectedOptionIndex === optionIndex ? "success600" : "info600"}
                                    rounded="md"
                                    m={{ b: "1rem", r: "0.5rem", l: "0.5rem" }}
                                    p={{ x: "1.5rem", y: "1.5rem" }}
                                    w="calc(50% - 1rem)"
                                >
                                    {option}
                                </Button>
                            ))}
                        </Div>
                    </Div>
                </Div>
            ))}
        </Flicking>
    );
}