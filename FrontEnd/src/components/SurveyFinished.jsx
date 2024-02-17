import React from 'react'; // Ensure React is imported
import { Button, Div } from "atomize";
import Loading2 from "./Loading2";

// Correct the function component definition to use props
const SurveyFinished = ({ isLoading, error, data, handleButtonClick }) => {
    return (
        <Div>
            {isLoading && <Loading2 />}
            {error && <p>Error: {error}</p>}
            {data && (
                <Div>
                    <p>Thank you for your participation!</p>
                    <p>{data.message}</p>
                    {data.additionalData && <p>追加情報: {data.additionalData}</p>}
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
                    <Div
                        d="flex"
                        align="center"
                        justify="center"
                        style={{ width: '100%', height: '100vh' }}
                    >
                        <Button onClick={handleButtonClick}>
                            アンケートを開始
                        </Button>
                    </Div>
                </Div>
            )}
        </Div>
    );
}

// Correct the export statement
export default SurveyFinished;
