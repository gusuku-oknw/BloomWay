import React, { useState } from 'react';
import { Div, Button, Textarea, Icon } from "atomize";
import { FaStar } from 'react-icons/fa';

const FinalSurvey = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const submitFeedback = () => {
        // フィードバックの送信や保存のロジックをここに実装
        onSubmit({ rating, feedback });
    };

    return (
        <Div p="2rem" d="flex" flexDir="column" align="center">
            <Div
                d="flex"
                align="center"
                p="1rem"
            >
                test
                {/* 星の評価を表示 */}
                {[...Array(5)].map((_, index) => (
                    <FaStar
                        key={index}
                        color={index < rating ? "#ffc107" : "#e4e5e9"}
                        size="20px"
                        cursor="pointer"
                        onClick={() => setRating(index + 1)}
                    />
                ))}
            </Div>
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
