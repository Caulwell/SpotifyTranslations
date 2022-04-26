import { StyledTrack, Image, TrackDetails, TrackName, TrackArtist } from "./TrackSearchResult-styles";

export default function TrackSearchResult({track, chooseTrack}){

    const handlePlay = () => {
        chooseTrack(track);
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