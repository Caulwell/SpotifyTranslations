import axios from "axios";
import { useEffect, useState } from "react";
import DefinitionsList from "./DefinitionsList";
import DictionaryMeta from "./DictionaryMeta";

import { StyledDictionary, Heading, StyledSVG, WordContainer, WordButton, DefinitionContainer } from "./Dictionary-styles";









export default function Dictionary({selectedLine, setDictionaryOpen}){

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


        <StyledDictionary>
        {selectedLine && 
        <>
        <Heading>
            <h3>
                {selectedLine.translation}
            </h3>
            <StyledSVG
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setDictionaryOpen(false)}
            >
            <path
                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                fill="currentColor"
            />
            </StyledSVG>
        </Heading>
        <WordContainer>
                {words.map((word, index) => {
                    return (
                        <WordButton key={`button${index}`} name={word} selected={word === selectedWord} last={index === words.length-1} first ={index === 0} onClick={e => handleGetDefinition(e)}>{word}</WordButton>
                    )
                })}
        </WordContainer>
            
            <DefinitionContainer>
                {definitions &&
                <>
                    <DictionaryMeta selectedWord={selectedWord} definitions={definitions}/>
                    <DefinitionsList definitions ={definitions.definitions}/>
                </>
                   
                }
            </DefinitionContainer>
        </>
        }

        
       
    </StyledDictionary>

    )
}