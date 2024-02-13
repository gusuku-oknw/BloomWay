import React, {useState, useRef, useEffect} from 'react';
import { Div, Button } from "atomize";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

import FinalSurvey from "./FinalSurvey";
import useBackEndFetch from "./useBackEndFetch";
import Loading2 from "./Loading2";

export default function ChoicesWithFlicking() {
    const { sendRequest, isLoading, error, data } = useBackEndFetch();

    const [panels, setPanels] = useState([
        { question: "質問1", options: ["選択肢1", "選択肢2"], selectedOptionIndex: null },
        { question: "質問2", options: ["選択肢A", "選択肢B", "選択肢C", "選択肢D"], selectedOptionIndex: null },
        { question: "質問3", options: ["選択肢X", "選択肢Y", "選択肢Z", "選択肢W"], selectedOptionIndex: null },
    ]);

    const [isSurveyFinished, setIsSurveyFinished] = useState(false);

    const flickingRef = useRef(null);

    const moveToNextPanel = async (panelIndex, optionIndex) => {
        // 選択肢の選択を更新
        const updatedPanels = panels.map((panel, idx) => {
            if (idx === panelIndex) {
                return { ...panel, selectedOptionIndex: optionIndex };
            }
            return panel;
        });
        setPanels(updatedPanels);

        // 未選択の質問があるかチェック
        const firstUnansweredIndex = updatedPanels.findIndex(panel => panel.selectedOptionIndex === null);

        const flicking = flickingRef.current;
        if (flicking) {
            if (firstUnansweredIndex === -1) {
                // 全ての質問に回答があれば、データを送信
                await sendRequest(`/ChoicesPersonal`, { panels: updatedPanels });
                setIsSurveyFinished(true); // アンケート終了フラグを立てる
            } else {
                // 未選択の質問があれば、その質問に移動
                flicking.moveTo(firstUnansweredIndex).catch(e => console.error("Failed to move:", e));
            }
        }
    };

    // アンケート終了後の処理（結果表示など）
    if (isSurveyFinished) {
        return (
            <Div>
                {isLoading && <Loading2 />}
                {error && <p>Error: {error}</p>}
                {data && (
                    <Div>
                        <p>Thank you for your participation!</p>
                        {/* ここでバックエンドからのデータを表示 */}
                        <p>{data.message}</p>
                        {/* 例えば、追加のデータがあればここに表示 */}
                        {data.additionalData && <p>追加情報: {data.additionalData}</p>}
                        {/* ダミーデータを例として、更に詳細な情報を表示する場合 */}
                        {data.details && (
                            <Div>
                                <p>詳細情報:</p>
                                <ul>
                                    {data.details.map((detail, index) => (
                                        <li key={index}>{detail}</li>
                                    ))}
                                </ul>
                            </Div>
                        )}
                    </Div>
                )}
            </Div>
        );
    }

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
                <Div
                    w='85vw'
                    m="1rem"
                >
                    <Div
                        bg="info200"
                        rounded="lg"
                        w='85vw'
                        h='80vw'
                        p={{ t: "2rem", b: "2rem" }}
                        d="flex"
                        flexDir="column"
                        align="center"
                        justify="start"
                        key={panelIndex}>
                        <Div
                            textAlign="center"
                            textWeight="800"
                            textSize="title"
                            style={{ width: '100%', textAlign: 'center', marginBottom: '2rem' }}
                        >
                            {panel.question}
                        </Div>
                        <Div
                            d="flex"
                            flexWrap="wrap"
                            justify="space-around"
                            align="center"
                            w="100%"
                        >
                            {panel.options.map((option, optionIndex) => (
                                <Button
                                    key={optionIndex}
                                    onClick={() => moveToNextPanel(panelIndex, optionIndex)}
                                    bg={panel.selectedOptionIndex === optionIndex ? "success700" : "info700"}
                                    hoverBg={panel.selectedOptionIndex === optionIndex ? "success600" : "info600"}
                                    rounded="md"
                                    m={{ b: "1rem", r: "0.5rem", l: "0.5rem" }}
                                    p={{ x: "1.5rem", y: "1.5rem" }}
                                    w={panel.options.length === 2 ? "100%" : "calc(50% - 1rem)"} // 2x1の場合は全幅、2x2の場合は半分の幅
                                    h="auto"
                                    minH="6.5rem" // 最小高さを保持
                                    maxH="10rem" // 最大高さを指定
                                    textSize="subheader"
                                    textWeight="500"
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