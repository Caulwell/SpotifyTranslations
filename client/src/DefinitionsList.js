import {useEffect, useState,} from "react";
import styled from "styled-components";

const Definitions = styled.div`
padding: 0 0.5rem;
display: flex;
flex-direction: column;
`;

const Definition = styled.div`
    background-color: ${props => props.theme.lightPrimary};
    height: 8rem;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
`;

const DefinitionNumber = styled.div`
    font-size: 4rem;
`;

const DefinitionTitle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DefinitionBody = styled.div`
    display: flex;
    flex-direction: column;
`;

const DefinitionControls = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledSVG= styled.svg`
fill: ${props => props.theme.text };
opacity: ${props => props.active ? 1 : 0.5};
margin-bottom: 2rem;
&:hover {
    cursor: ${props => props.active ? "pointer": "auto"};
}
`;


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
                <h4>Definitions</h4>
            {current && 
                <Definition>
                        <DefinitionNumber>
                            {currentIndex+1}
                        </DefinitionNumber>
                        
                        <DefinitionBody>
                        <DefinitionTitle>
                        {current.translations && <div><strong>{current.translations.map(string => (string.charAt(0).toUpperCase() +string.substr(1))).join(" | ")}</strong></div>}
                        {current.domain &&<div>  Domain: {current.domain}</div>}
                            {current.usage &&<div> Usage: {current.usage}</div>}
                        </DefinitionTitle>
                            {current.spanishDef && <div>Spanish Definition: {current.spanishDef}</div>}
                            {current.exampleSpan &&<div> Example: {current.exampleSpan}</div>}
                            {current.exampleTrans && <div>Example: {current.exampleTrans}</div>}
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
            
            }
                   
        </Definitions>
        
        
    )
}