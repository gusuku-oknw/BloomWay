import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6の場合
import { Div, Button } from "atomize";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

import FinalSurvey from "./FinalSurvey";
import useBackEndFetch from "./useBackEndFetch";
import SurveyFinished from "./SurveyFinished";
import DraggableImage from "./DraggableImage";
import SelectTable from './SelectTable'; // SelectTable コンポーネントのファイルパスに応じて調整してください

export default function ChoicesWithFlicking() {
    const { sendRequest, isLoading, error, data } = useBackEndFetch();

    const [panels, setPanels] = useState([
        { question: "お好みの化粧品の位置を選んでください", type: "selectTable" },
        { question: "年齢は？", options: ["20代", "30代"], selectedOptionIndex: null, type: "choice" },
        { question: "肌悩みは?", options: ["敏感肌", "乾燥", "シワ・たるみ", "シミ・くすみ", "毛穴・ニキビ"], selectedOptionIndex: null, type: "choice" },
        { question: "肌はかさつきやすいですか？", options: ["カサつきを繰り返している", "たまにカサつく", "カサつかない"], selectedOptionIndex: null, type: "choice" },
    ]);

    const [isSurveyFinished, setIsSurveyFinished] = useState(false);
    const [isQuestionnaire, setIsQuestionnaire] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false); // 完了状態を管理
    const navigate = useNavigate(); // React Router v6
    const flickingRef = useRef(null);

    const labels = [
        { x: null, y: 3, text: "Example Y-axis Label" },
        { x: 2, y: null, text: "Example X-axis Label" }
    ];

    const handleButtonClick = () => {
        setIsQuestionnaire(true);
    };

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

    if (isQuestionnaire) {
        return <FinalSurvey onSubmit={(data) => console.log(data)} />;
    }

    if (isSurveyFinished) {
        return (
            <SurveyFinished
                isLoading={isLoading}
                error={error}
                data={data}
                handleButtonClick={handleButtonClick}
            />
        );
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
                    bg='brand100'
                    rounded="lg"
                    w='85vw'
                    h='50vh'
                    p={{ t: "2rem", b: "2rem" }}
                    d="flex"
                    flexDir="column"
                    align="center"
                    justify="start"
                    key={panelIndex}
                >
                    {panel.type === "selectTable" ? (
                        <Div>
                            <SelectTable x={5} y={5} labels={labels} />
                        </Div>
                    ) : (
                        <>
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
                                        bg={panel.selectedOptionIndex === optionIndex ? "success300" : "info400"}
                                        hoverBg={panel.selectedOptionIndex === optionIndex ? "success600" : "info600"}
                                        rounded="md"
                                        m={{ b: "1rem", r: "0.5rem", l: "0.5rem" }}
                                        p={{ x: "1.5rem", y: "1.5rem" }}
                                        w={panel.options.length === 2 ? "100%" : "calc(50% - 1rem)"} // 2x1の場合は全幅、2x2の場合は半分の幅
                                        h={panel.options.length <= 4 ? "100%" : panel.options.length >= 5 ? "calc((100% - (1rem * (panel.options.length - 1))) / Math.ceil(panel.options.length / 2))" : "calc(50% - 1rem)"} // 選択肢の数に応じて高さを動的に計算
                                        minH="6.5rem" // 最小高さを保持
                                        maxH="10rem" // 最大高さを指定
                                        textSize="subheader"
                                        textWeight="500"
                                    >
                                        {option}
                                    </Button>
                                ))}
                            </Div>
                        </>
                    )}
                </Div>
            ))}
        </Flicking>
    );
}