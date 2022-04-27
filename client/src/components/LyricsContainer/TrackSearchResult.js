import Play from "../../icons/Play";
import { StyledTrack, TrackHeader, TrackNumber, Image, TrackDetails, TrackName, TrackArtist } from "./TrackSearchResult-styles";

export default function TrackSearchResult({track, chooseTrack, index}){

    const handlePlay = () => {
        chooseTrack(track);
    };

    return (
        <StyledTrack onClick={handlePlay}>
           
            <TrackDetails>
                <TrackNumber>{index+1}</TrackNumber>
                <Image src={track.albumUrl} />   
                <TrackName>{track.title} </TrackName>
                <TrackArtist>{track.artist}</TrackArtist>
            </TrackDetails>
                <Play size="42"/>
        </StyledTrack>
    )
}