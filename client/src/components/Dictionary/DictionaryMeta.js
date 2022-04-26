import { StyledSVG, MetaInfo, SelectedWord, WordInfo, InfoButton } from "./DictionaryMeta-styles"
import Category from "../../icons/Category";
import Gender from "../../icons/Gender";
import Microphone from "../../icons/Microphone";


export default function DictionaryMeta({selectedWord, definitions}){


    return (

        <MetaInfo>
            <SelectedWord>{selectedWord.length > 1 ? selectedWord.charAt(0).toUpperCase() + selectedWord.substring(1) : selectedWord}</SelectedWord>
                <div style={{display:"flex", justifyContent: "space-between", flexGrow: 2}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                    {definitions.wordType && 
                            <WordInfo>
                                <Category/>
                                {definitions.wordType}
                            </WordInfo>
                    }
                    {definitions.gender && 
                        
                        <WordInfo>
                            <Gender/>
                        {definitions.gender}
                        </WordInfo>
                    }
                    {definitions.pronounciation && 
                        <WordInfo>
                        <Microphone/>
                        {definitions.pronounciation}
                        
                        </WordInfo>
                    }
                    </div>
                    
                    <InfoButton target="_blank" href={"https://dictionary.cambridge.org/dictionary/spanish-english/" + selectedWord}>MORE INFORMATION</InfoButton>
                </div>
                
        </MetaInfo>
    )
}