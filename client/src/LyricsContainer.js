import { useEffect } from "react";
import styled from "styled-components";

const StyledLyrics = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
overflow-y: auto;
padding: 1rem 1rem;
width: 48vw;
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

const StyledLyric = styled.div`
width: 95%;
box-sizing: border-box;
padding: 0.4rem;
margin-bottom: 0.2rem;
box-shadow: ${props => props.selected ?  `0px 0px 2px 2px ${props.theme.flair1}` : `0 4px 8px rgba(0,0,0,0.2)`};
transition: 0.3s;
&:hover{
    box-shadow: 0 8px 16px 0 ${props => props.selected ? `2px solid ${props.theme.flair1}` : "rgba(0,0,0,0.2)"};
    cursor: pointer;
}
`;



export default function LyricsContainer({lyrics, handleSelectLyric, selectedLine}){

    
   
    return (

        <StyledLyrics>
            {lyrics.map((line, index) => {
                if(!line.original) return null;
                return (
                    <StyledLyric selected={selectedLine === line} key={`lyric${index}`} name={index} onClick={e => handleSelectLyric(e)}>
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