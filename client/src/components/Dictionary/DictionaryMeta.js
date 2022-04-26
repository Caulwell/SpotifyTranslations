import { StyledSVG, MetaInfo, SelectedWord, WordInfo, InfoButton } from "./DictionaryMeta-styles"

export default function DictionaryMeta({selectedWord, definitions}){

 
    return (

        <MetaInfo>
            <SelectedWord>{selectedWord.length > 1 ? selectedWord.charAt(0).toUpperCase() + selectedWord.substring(1) : selectedWord}</SelectedWord>
                <div style={{display:"flex", justifyContent: "space-between", flexGrow: 2}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                    {definitions.wordType && 
                            <WordInfo>
                                <StyledSVG
                                width="1.2rem"
                                height="1.2rem"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M10 12C9.44769 12 9 12.4477 9 13C9 13.5523 9.44769 14 10 14H14C14.5522 14 15 13.5523 15 13C15 12.4477 14.5522 12 14 12H10Z"
                                    fill="currentColor"
                                />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M4 2C2.34314 2 1 3.34314 1 5V19C1 20.6569 2.34314 22 4 22H20C21.6569 22 23 20.6569 23 19V5C23 3.34314 21.6569 2 20 2H4ZM20 4H4C3.44769 4 3 4.44769 3 5V8H21V5C21 4.44769 20.5522 4 20 4ZM3 19V10H21V19C21 19.5523 20.5522 20 20 20H4C3.44769 20 3 19.5523 3 19Z"
                                    fill="currentColor"
                                />
                            </StyledSVG>
                            {definitions.wordType}
                            </WordInfo>
                    }
                    {definitions.gender && 
                        
                        <WordInfo>
                        <StyledSVG
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                                fill="currentColor"
                            />
                            <path
                                d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                                fill="currentColor"
                            />
                        </StyledSVG>
                        {definitions.gender}
                        </WordInfo>
                    }
                    {definitions.pronounciation && 
                        <WordInfo>
                        <StyledSVG
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9 4C9 2.34315 10.3431 1 12 1C13.6569 1 15 2.34315 15 4V12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12V4ZM13 4V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4Z"
                                fill="currentColor"
                            />
                            <path
                                d="M18 12C18 14.973 15.8377 17.441 13 17.917V21H17V23H7V21H11V17.917C8.16229 17.441 6 14.973 6 12V9H8V12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12V9H18V12Z"
                                fill="currentColor"
                            />
                        </StyledSVG>
                        {definitions.pronounciation}
                        
                        </WordInfo>
                    }
                    </div>
                    
                    <InfoButton target="_blank" href={"https://dictionary.cambridge.org/dictionary/spanish-english/" + selectedWord}>MORE INFORMATION</InfoButton>
                </div>
                
        </MetaInfo>
    )
}