import styled from "styled-components";

const StyledTrack = styled.div`
    display: flex;
    align-items: center;
    padding: 0.4rem;
    margin: 0 0.3rem 1.5rem 0;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

const Image = styled.img`
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;
`;

const TrackDetails = styled.div`
    display: flex; 
`;

const TrackName = styled.h4`
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
    margin-right: 1rem;
    padding: 0;
`;

const TrackArtist = styled.h5`
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    padding: 0
`;


export default function TrackSearchResult({track, chooseTrack}){

    const handlePlay = () => {
        chooseTrack(track);
        console.log(track);
    };

    return (
        <StyledTrack onClick={handlePlay}>
            <Image src={track.albumUrl} />   
            <TrackDetails>
                <TrackName>Title: {track.title} </TrackName>
                <TrackArtist>Artist: {track.artist}</TrackArtist>
            </TrackDetails>    
        </StyledTrack>
    )
}