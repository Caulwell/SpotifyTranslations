import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useTheme } from "styled-components";

export default function Player({accessToken, trackUri, updateTrack}){

    const [play, setPlay ] = useState(false);
    const theme = useTheme();

    const callbackCheck = data => {

        if(data.type==="track_update"){
            updateTrack({
                artist: data.track.artists[0].name,
                title: data.track.name,
            });
        }

        if(!data.isPlaying) setPlay(false);
    };

    const styles = {
        bgColor: theme.lighter,
        color: theme.text,
        trackNameColor: theme.text,
        trackArtistColor: theme.text,
        sliderColor: theme.flair,
        sliderHandleColor: theme.flair,
        ativeColor: theme.flair,

    };

    useEffect(() => {
        setPlay(true);
    }, [trackUri]);

    if(!accessToken) return null;
        return <SpotifyPlayer 
                    token={accessToken}
                    showSaveIcon
                    play={play}
                    uris={!trackUri?.length ? [] : trackUri}
                    styles={styles}
                    callback={data => callbackCheck(data)}
        />

}