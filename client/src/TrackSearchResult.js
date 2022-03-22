

export default function TrackSearchResult({track, chooseTrack}){

    const handlePlay = () => {
        chooseTrack(track);
    }

    return (
        <div onClick={handlePlay}>
            <img src={track.albumUrl} style={{height: "64px", width: "64px"}}/>   
            <div>
                <div>{track.title}</div>
                <div>{track.artist}</div>
            </div>    
        </div>
    )
}