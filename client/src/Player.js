import { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({accessToken, trackUri}){

    const [play, setPlay ] = useState(false);

    const styles = {
        bgColor: `${props => props.theme.body}`,
        color: `${props => props.theme.text}`,
        trackNameColor: `${props => props.theme.text}`
    };

    useEffect(() => {
        setPlay(true);
    }, [trackUri])

    if(!accessToken) return null;
        return <SpotifyPlayer 
                    token={accessToken}
                    showSaveIcon
                    callback={state => {
                        if(!state.isPlaying) setPlay(false)
                    }}
                    play={play}
                    uris={trackUri ? [trackUri] : []}
                    styles={styles}
        />

}