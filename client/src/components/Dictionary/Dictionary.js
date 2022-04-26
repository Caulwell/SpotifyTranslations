import axios from "axios";
import { useEffect, useState } from "react";
import DefinitionsList from "./DefinitionsList";
import DictionaryMeta from "./DictionaryMeta";

import { StyledDictionary, Heading, StyledSVG, WordContainer, WordButton, DefinitionContainer } from "./Dictionary-styles";
import Close from "../../icons/Close";


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
            <Close closeFunction={setDictionaryOpen}/>
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