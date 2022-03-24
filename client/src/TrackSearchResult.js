import styled from "styled-components";

const StyledTrack = styled.div`
    display: flex;
    
`;


export default function TrackSearchResult({track, chooseTrack}){

    const handlePlay = () => {
        chooseTrack(track);
    }

    return (
        <StyledTrack onClick={handlePlay}>
            <img src={track.albumUrl} style={{height: "64px", width: "64px"}}/>   
            <div>
                <div>{track.title}</div>
                <div>{track.artist}</div>
            </div>    
        </StyledTrack>
    )
}