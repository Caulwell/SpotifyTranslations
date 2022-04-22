import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";



const StyledSelectedLyric = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    padding: 1rem 1rem;
    overflow-y: auto; 

    &::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: ${props => props.theme.body};
    }
    &::-webkit-scrollbar
    {
        width: 12px;
        background-color: ${props => props.theme.body};
    }
    &::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: ${props => props.theme.secondaryBody};
    }
`;

const Heading = styled.div`
    

`;


const WordContainer = styled.div`
    display: flex;
`;

const WordButton = styled.button`

    border: none;
    cursor: pointer;
    width: 6rem;
    height: 2rem;

    color: ${props => props.theme.buttonText};
    background-color: ${props => props.selected ? props.theme.flair2 : props.theme.flair1};

    border-top-left-radius: ${props => props.first ? "7px" : 0};
    border-bottom-left-radius: ${props => props.first ? "7px" : 0};
    border-bottom-right-radius: ${props => props.last ? "7px" : 0};
    border-top-right-radius: ${props => props.last ? "7px" : 0};
    
    
`;

const DefinitionContainer = styled.div`

`;

const DefinitionsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Definition = styled.div`
    border-top: 1px solid grey;
    padding-top: 1rem;
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

        // split sentence to words with punctuation removed
        const splitOriginal = selectedLine.original.replace(/[-'`~!¡@#$%^&*()_|+=¿?;:'",.<>\{\}\[\]\\\/]/gi, '')
            .split(/\s+/);
    setWords(splitOriginal);

    }, [selectedLine]);

    useEffect(() => {
        words.length && setSelectedWord(words[0]);
    }, [words]);


    useEffect(() => {
        if(selectedWord === "") return;
        setDefinitions({});

        // replace diacritics for dictionary scraping
        let word = selectedWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        axios.get("http://localhost:3001/definition", {
            params: {
                word
            }
        })
        .then(res => {
            setDefinitions(res.data);
        });
    }, [selectedWord]);

    
    const handleGetDefinition = e => {
        const word = e.currentTarget.getAttribute("name");
        setSelectedWord(word);
        
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
                        <WordButton key={`button${index}`} name={word} selected={word === selectedWord} last={index === words.length-1} first ={index === 0} onClick={e => handleGetDefinition(e)}>{word}</WordButton>
                    )
                })}
            </WordContainer>
            
        </Heading>
            
            <DefinitionContainer>
                {definitions &&
                <>
                    <h2>{selectedWord.length > 1 ? selectedWord.charAt(0).toUpperCase() + selectedWord.substring(1) : selectedWord} {definitions.wordType && `- ${definitions.wordType}`}</h2>
                    {definitions.gender && 
                        <h5>Gender: {definitions.gender}</h5>
                    }
                    {definitions.pronounciation && 
                        <h5>Pronounciation: {definitions.pronounciation}</h5>
                    }

                    <DefinitionsList>
                        {definitions.definitions && definitions.definitions.map((definition, index) => {
                            return (
                                <Definition key={`definition${index}`}>
                                    <DefinitionTitle>
                                    {definition.translations && <div><strong>{definition.translations.map(string => (string.charAt(0).toUpperCase() +string.substr(1))).join(" | ")}</strong></div>}
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

        {definitions.wordType === "" && "No definitions available for this word"}
       
    </StyledSelectedLyric>

    )
}