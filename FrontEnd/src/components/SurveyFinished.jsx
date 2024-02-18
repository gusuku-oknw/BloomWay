import React from 'react';
import { Button, Div, Text, Image, Anchor } from "atomize";
import Loading2 from "./Loading2";

const SurveyFinished = ({ isLoading, error, data, handleButtonClick }) => {
    return (
        <Div
            d="flex"
            flexDir="column"
            overflow="hidden"
            rounded="lg"
            border="1px solid"
            borderColor="gray300"
            bg="white"
            h="100%"
            p={{ xs: "1rem", sm: "1.5rem" }}
            textAlign="center"
        >
            {isLoading && <Loading2 />}
            {error && <Text textColor="danger800" m={{ b: "1rem" }}>Error: {error}</Text>}
            {data && (
                <>
                    {/*<Text textSize="title" fontWeight="600" textColor="info800" m={{ b: "0.5rem" }}>*/}
                    {/*    Thank you for your participation!*/}
                    {/*</Text>*/}
                    <Text textSize="title" fontWeight="600" textColor="info800" m={{ b: "0.5rem" }}>
                        {data.message}
                    </Text>
                    {data.additionalData && <Text textSize="body" textColor="gray600">追加情報: {data.additionalData}</Text>}
                    {data.details && (
                        <Div m={{ t: "1rem", b: "1rem" }}>
                            <Text textSize="subheader" textColor="gray700">詳細情報:</Text>
                            <Div m={{ l: "1rem" }}>
                                {data.details.map((detail, index) => (
                                    <Text key={index} textColor="gray600">{detail}</Text>
                                ))}
                            </Div>
                        </Div>
                    )}
                    <Div m={{ y: "2rem" }}>
                        <Image
                            src="https://cdn.pixabay.com/photo/2019/02/01/19/12/plastic-3969638_1280.jpg"
                            alt="Survey Finished" objectFit="cover" />
                    </Div>
                    <Button onClick={handleButtonClick} bg="info700" hoverBg="info600" textColor="white" rounded="circle" p={{ x: "1.5rem" }}>
                        アンケートを開始
                    </Button>
                </>
            )}
        </Div>
    );
}

export default SurveyFinished;
