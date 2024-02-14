import React, { useState } from 'react';
import { Div, Button, Textarea } from "atomize";
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート

import useBackEndFetch from "./useBackEndFetch";

const FinalSurvey = ({ onSubmit }) => {
    const navigate = useNavigate(); // useNavigateフックを使用してnavigate関数を取得

    const { sendRequest, isLoading, error, data } = useBackEndFetch();

    const [starPanels, setStarPanels] = useState([
        { question: "見やすさ", rating: 0 },
        { question: "使いやすさ", rating: 0 },
        { question: "動作", rating: 0 },
    ]);

    // 複数のフィードバックを管理するための状態
    const [feedbacks, setFeedbacks] = useState({
        usability: '',
        performance: '',
        general: '',
    });

    const setRating = (index, rating) => {
        const updatedStarPanels = [...starPanels];
        updatedStarPanels[index].rating = rating;
        setStarPanels(updatedStarPanels);
    };

    const handleFeedbackChange = (key, value) => {
        setFeedbacks(prevFeedbacks => ({
            ...prevFeedbacks,
            [key]: value,
        }));
    };

    const submitFeedback = async () => {
        // フィードバックの送信や保存のロジックをここに実装
        onSubmit({ starPanels, feedbacks });
        await sendRequest(`/ChoicesFeedback`, { starPanels, feedbacks });
        if (data) {
            navigate('/thankYou');
        } else if (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <>
            <Div
                align="center"
                d="flex"
                justify="center"
            >
                このアプリについてのアンケートをお願いいたします。
            </Div>
            <Div p="2rem" d="flex" flexDir="column" align="center">
                {starPanels.map((panel, index) => (
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
                {/* 複数のフィードバック入力フィールド */}
                {Object.keys(feedbacks).map((key) => (
                    <Textarea
                        key={key}
                        value={feedbacks[key]}
                        onChange={(e) => handleFeedbackChange(key, e.target.value)}
                        placeholder={`フィードバックをお聞かせください (${key})`}
                        m={{ t: "1rem" }}
                        p="0.5rem"
                        w="15rem"
                    />
                ))}
                <Button
                    onClick={submitFeedback}
                    bg="info500"
                    hoverBg="info300"
                    m={{ t: "1rem" }}
                >
                    送信
                </Button>
            </Div>
        </>
    );
};

export default FinalSurvey;
