import {useEffect, useState,} from "react";
import DownChevron from "../../icons/DownChevron";
import UpChevron from "../../icons/UpChevron";
import { Definition, Definitions, DefinitionNumber, DefinitionTitle, TitleItem, DefinitionBody, DefinitionControls} from "./DefinitionsList-styles";

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
                        
                        <UpChevron
                            currentIndex={currentIndex}
                            handleScroll={handleScroll}
                        />

                        <DownChevron
                            definitions={definitions}
                            handleScroll={handleScroll}
                            currentIndex={currentIndex}
                        />
                        </DefinitionControls>
                </Definition>
            
                   
        </Definitions>
        
        
    )
}