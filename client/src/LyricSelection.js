import { useEffect, useState } from "react";
import styled from "styled-components";



const StyledSelectedLyric = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    padding: 1rem 1rem;
`;


const WordContainer = styled.div`
    display: flex;
`;

const WordButton = styled.button`

`;


export default function LyricSelection({selectedLine,}){

    const [words, setWords] = useState([]);


    useEffect(() =>{

        const splitOriginal = selectedLine.original.split(" ");
        setWords(splitOriginal);


    }, [selectedLine]);



    return (


        <StyledSelectedLyric>
        {selectedLine && 
        <>
            <h3>
                {selectedLine.translation}
            </h3>
            <WordContainer>
                {words.map(word => {
                    return (
                        <WordButton>{word}</WordButton>
                    )
                })}
            </WordContainer>
        </>
        }
       
    </StyledSelectedLyric>

    )
}