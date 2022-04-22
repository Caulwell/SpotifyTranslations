import { useEffect } from "react";
import styled from "styled-components";

const StyledLyrics = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const StyledLyric = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    margin-bottom: 0.2rem;
    background-color: ${props => props.selected ? props.theme.selected : props.theme.midPrimary};
    opacity: ${props => props.selected ? 1 : 0.8};
    border-radius: 3px;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: ${props => props.selected ? props.theme.flair : props.theme.text};
    transition: 0.3s;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

const Original = styled.div`
    text-align: left;
`;

const Translation = styled.div`
    text-align: right;
`;



export default function LyricsContainer({lyrics, handleSelectLyric, selectedLine, dictionaryOpen}){

    
   
    return (

        <StyledLyrics>
        {dictionaryOpen ?
        
        <StyledLyric selected={true}>
            <Original>
                {selectedLine.original}
            </Original>
            <Translation>
                {selectedLine.translation}
            </Translation>
        </StyledLyric>
        :
       lyrics.map((line, index) => {
                if(!line.original) return null;
                return (
                    <StyledLyric selected={selectedLine === line} key={`lyric${index}`} name={index} onClick={e => handleSelectLyric(e)}>
                        <Original>
                            {line.original}
                        </Original>
                        <Translation>
                            {line.translation}
                        </Translation>
                    </StyledLyric>
                )
            })}

        </StyledLyrics>
    )
}