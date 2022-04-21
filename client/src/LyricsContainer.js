import { useEffect } from "react";
import styled from "styled-components";

const StyledLyrics = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
overflow-y: auto;
padding: 1rem 1rem;
width: 48vw;
`;

const StyledLyric = styled.div`
width: 95%;
padding: 0.4rem;
margin-bottom: 0.2rem;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
&:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    cursor: pointer;
}
`;



export default function LyricsContainer({lyrics, handleSelectLyric}){

    
   
    return (

        <StyledLyrics>
            {lyrics.map((line, index) => {
                if(!line.original) return null;
                return (
                    <StyledLyric key={`lyric${index}`} name={index} onClick={e => handleSelectLyric(e)}>
                        <div>
                            {line.original}
                        </div>
                        <div>
                            {line.translation}
                        </div>
                    </StyledLyric>
                )
            })}
        </StyledLyrics>
    )
}