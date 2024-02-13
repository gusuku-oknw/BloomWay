import React, { useState } from 'react';
import { Div, Button, Textarea } from "atomize";
import { FaStar } from 'react-icons/fa';

const FinalSurvey = ({ onSubmit }) => {
    const [panels, setPanels] = useState([
        { question: "質問1", rating: 0 },
        { question: "質問2", rating: 0 },
        { question: "質問3", rating: 0 },
    ]);

    const [feedback, setFeedback] = useState('');

    const setRating = (index, rating) => {
        const updatedPanels = [...panels];
        updatedPanels[index].rating = rating;
        setPanels(updatedPanels);
    };

    const submitFeedback = () => {
        // フィードバックの送信や保存のロジックをここに実装
        onSubmit({ panels, feedback });
    };

    return (
        <Div p="2rem" d="flex" flexDir="column" align="center">
            {panels.map((panel, index) => (
                <Div key={index} d="flex" align="center" m={{b: "1rem"}}>
                    <Div>{panel.question}</Div>
                    <Div d="flex" align="center" p="1rem">
                        {/* 星の評価を表示 */}
                        {[...Array(5)].map((_, starIndex) => (
                            <FaStar
                                key={starIndex}
                                color={starIndex < panel.rating ? "#ffc107" : "#e4e5e9"}
                                size="20px"
                                cursor="pointer"
                                onClick={() => setRating(index, starIndex + 1)}
                            />
                        ))}
                    </Div>
                </Div>
            ))}
            <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="フィードバックをお聞かせください"
                m={{ t: "1rem" }}
                p="0.5rem"
            />
            <Button
                onClick={submitFeedback}
                bg="info700"
                hoverBg="info600"
                m={{ t: "1rem" }}
            >
                送信
            </Button>
        </Div>
    );
};

export default FinalSurvey;
