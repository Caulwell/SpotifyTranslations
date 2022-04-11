import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";



const StyledSelectedLyric = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    padding: 1rem 1rem;
    overflow-y: auto; 
`;

const Heading = styled.div`
    

`;


const WordContainer = styled.div`
    display: flex;
`;

const WordButton = styled.button`

    ${({ first }) => first && `
        border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
  `}
  ${({ last }) => last && `
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
  `}
  ${({ selected }) => selected && `
        background-color: lime;
  `}


    width: 4rem;
    height: 2rem;
`;

const DefinitionContainer = styled.div`

`;

const DefinitionsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Definition = styled.div`
    height: 8rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const DefinitionTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DefinitionBody = styled.div`
    display: flex;
    flex-direction: column;
`;


export default function LyricSelection({selectedLine,}){

    const [words, setWords] = useState([]);
    const [selectedWord, setSelectedWord] = useState("");
    const [definitions, setDefinitions] = useState({});



    useEffect(() =>{

        if(!selectedLine) return;
        const splitOriginal = selectedLine.original.split(" ");
        setWords(splitOriginal);


    }, [selectedLine]);

    
    const handleGetDefinition = e => {
        const word = e.currentTarget.getAttribute("name");
        setSelectedWord(word);
        axios.get("http://localhost:3001/definition", {
            params: {
                word
            }
        })
        .then(res => {
            setDefinitions(res.data);
        });
    };


    return (


        <StyledSelectedLyric>
        {selectedLine && 
        <>
        <Heading>
            <h3>
                {selectedLine.translation}
            </h3>
            <WordContainer>
                {words.map((word, index) => {
                    return (
                        <WordButton name={word} selected={word === selectedWord} last={index === words.length-1} first ={index === 0} onClick={e => handleGetDefinition(e)}>{word}</WordButton>
                    )
                })}
            </WordContainer>
            
        </Heading>
            
            <DefinitionContainer>
                {definitions &&
                <>
                    <h2>{selectedWord} {definitions.wordType && `- ${definitions.wordType}`}</h2>
                    {definitions.gender && 
                        <h5>Gender: {definitions.gender}</h5>
                    }
                    {definitions.pronounciation && 
                        <h5>Pronounciation: {definitions.pronounciation}</h5>
                    }

                    <DefinitionsList>
                        {definitions.definitions && definitions.definitions.map(definition => {
                            return (
                                <Definition>
                                    <DefinitionTitle>
                                    {definition.translations && <div><strong>{definition.translations}</strong>  </div>}
                                    {definition.domain &&<div>  Domain: {definition.domain}</div>}
                                     {definition.usage &&<div> Usage: {definition.usage}</div>}
                                    </DefinitionTitle>
                                    <DefinitionBody>
                                        {definition.spanishDef && <div>Spanish Definition: {definition.spanishDef}</div>}
                                        {definition.exampleSpan &&<div> Example: {definition.exampleSpan}</div>}
                                        {definition.exampleTrans && <div>Example: {definition.exampleTrans}</div>}
                                    </DefinitionBody>
                                </Definition>
                            )
                        })}
                    </DefinitionsList>
                </>
                   
                }
            </DefinitionContainer>
        </>
        }
       
    </StyledSelectedLyric>

    )
}