
import { StyledLyrics, StyledLyric, Original, Translation} from "./LyricsContainer-styles";


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
            })
        }
        </StyledLyrics>
    )
}