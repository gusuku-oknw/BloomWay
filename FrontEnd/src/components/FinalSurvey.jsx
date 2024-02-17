import React, { useState } from 'react';
import { Div, Button, Textarea, Icon } from "atomize";
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート

import useBackEndFetch from "./useBackEndFetch";

const FinalSurvey = ({ onSubmit }) => {
    const navigate = useNavigate(); // useNavigateフックを使用してnavigate関数を取得

    const { sendRequest, isLoading, error, data } = useBackEndFetch();
    const [submitLoading, setSubmitLoading] = useState(false);

    const [starPanels, setStarPanels] = useState([
        { question: "　見やすさ", rating: 0 },
        { question: "使いやすさ", rating: 0 },
        { question: "　　　動作", rating: 0 },
    ]);

    // 複数のフィードバックを管理するための状態
    const [feedbacks, setFeedbacks] = useState({
        usability: '',
        performance: '',
        general: '',
    });

    // 日本語の説明をマッピング
    const feedbackDescriptions = {
        usability: '使いやすさについてお聞かせください',
        performance: '動作についてお聞かせください',
        general: '全般的なフィードバックをお聞かせください',
    };

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
        setSubmitLoading(true);

        try {
            const response = await sendRequest(`/ChoicesFeedback`, { starPanels, feedbacks });

            // 成功した場合の条件をAPIの応答に合わせて調整する
            // ここではresponseに含まれる何らかのプロパティ（例：response.success）を確認しています
            if (response) {
                navigate('/thankYou');
            } else {
                // 応答が成功を示していない場合、エラーメッセージをログに記録
                console.error('Feedback submission was not successful:', response);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setSubmitLoading(false);
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
                        placeholder={feedbackDescriptions[key]}
                        m={{ t: "1rem" }}
                        p="0.5rem"
                        w="15rem"
                    />
                ))}
                <Button
                    onClick={submitFeedback}
                    disabled={submitLoading || isLoading} // Disable button when loading
                    bg="info500"
                    hoverBg="info300"
                    m={{ t: "1rem" }}
                    prefix={
                        <Icon
                            name={submitLoading ? "Loading" : "Edit"}
                            pos="absolute"
                            top="50%"
                            left="1rem"
                            transform="translateY(-50%)"
                            size="18px"
                            color="white"
                            m={{ r: "0.5rem" }}
                        />
                    }
                >
                    {submitLoading ? "送信中..." : "送信"}
                </Button>
            </Div>
        </>
    );
};

export default FinalSurvey;
