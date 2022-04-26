import {useEffect, useState,} from "react";
import { Definition, Definitions, DefinitionNumber, DefinitionTitle, TitleItem, DefinitionBody, DefinitionControls, StyledSVG } from "./DefinitionsList-styles";

export default function DefinitionsList({definitions}){

    const [current, setCurrent] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {

        if(definitions){
            setCurrent(definitions[0]);
            setCurrentIndex(0);
        } 


    },[definitions]);



    const handleScroll = e => {


        if(e.currentTarget.getAttribute("name") === "down"){            
            if(currentIndex<definitions.length-1){
                console.log("index:" + currentIndex + " length:" + definitions.length);
                setCurrent(definitions[currentIndex+1]);
                setCurrentIndex(currentIndex+1);
            }
        } else if(e.currentTarget.getAttribute("name") === "up") {
            if(currentIndex>0){
                setCurrent(definitions[currentIndex-1]);
                setCurrentIndex(currentIndex-1);
            }
            
        }
    };


    return (
            <Definitions>
               {!current ? <h4>No definitions available for this word</h4> : <h4>Definitions</h4>} 
               
                <Definition>
                        <DefinitionBody>
                        <DefinitionNumber>
                        {currentIndex+1}
                        </DefinitionNumber>

                        <div>
                        <DefinitionTitle>
                        {current?.translations && <TitleItem><strong>{current?.translations.map(string => (string.charAt(0).toUpperCase() +string.substr(1))).join(" | ")}</strong></TitleItem>}
                        {current?.domain &&<TitleItem>  Domain: {current?.domain}</TitleItem>}
                            {current?.usage &&<TitleItem> Usage: {current?.usage}</TitleItem>}
                        </DefinitionTitle>
                            {current?.spanishDef && <div>Spanish Definition: {current?.spanishDef}</div>}
                            {current?.exampleSpan &&<div> Example: {current?.exampleSpan}</div>}
                            {current?.exampleTrans && <div>Example: {current?.exampleTrans}</div>}
                        </div>
                        </DefinitionBody>
                        <DefinitionControls>
                        <StyledSVG
                            active={currentIndex>0}
                            onClick={(e) =>handleScroll(e)}
                            name="up"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                                fill="currentColor"
                            />
                        </StyledSVG>

                            <StyledSVG
                                active={definitions && currentIndex<definitions.length-1}
                                onClick={(e) => handleScroll(e)}
                                name="down"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                                    fill="currentColor"
                            />
                             </StyledSVG>
                        </DefinitionControls>
                </Definition>
            
                   
        </Definitions>
        
        
    )
}