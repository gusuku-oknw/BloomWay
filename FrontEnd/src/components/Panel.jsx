// Panel.js
import React from 'react';
import { Div, Button } from "atomize";
import DraggableImage from "./DraggableImage";

const Panel = ({ panel, panelIndex, onDragStart, onDragEnd, moveToNextPanel }) => {
    if (panel.type === "draggableImage") {
        return (
            <Div key={panelIndex} w='85vw' h='80rem' m="1rem" d="flex" align="center" justify="center">
                <DraggableImage onDragStart={onDragStart} onDragEnd={onDragEnd} />
            </Div>
        );
    } else {
        return (
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
                    {panel.options?.map((option, optionIndex) => (
                        <Button
                            key={optionIndex}
                            onClick={() => moveToNextPanel(panelIndex, optionIndex)}
                            bg={panel.selectedOptionIndex === optionIndex ? "success300" : "info400"}
                            hoverBg={panel.selectedOptionIndex === optionIndex ? "success600" : "info600"}
                            rounded="md"
                            m={{ b: "1rem", r: "0.5rem", l: "0.5rem" }}
                            p={{ x: "1.5rem", y: "1.5rem" }}
                            w="calc(50% - 1rem)"
                            textSize="subheader"
                            textWeight="500"
                        >
                            {option}
                        </Button>
                    ))}
                </Div>
            </Div>
        );
    }
};

export default Panel;
