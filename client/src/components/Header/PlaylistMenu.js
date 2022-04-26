import { useState } from "react";
import DownArrow from "../../icons/DownArrow";
import List from "../../icons/List";
import Play from "../../icons/Play";
import UpArrow from "../../icons/UpArrow";

import { MenuControl, DropDown, Playlist, PlaylistControls, } from "./PlaylistMenu-styles";



export default function PlaylistMenu({playlists, handlePlay, handleView}){


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    const shortenName = string => {
        return string.substring(0, 17) + "...";
    }


    return (
        <>
        <MenuControl onClick={handleOpen}>
            Your Playlists 
            {open ?  <UpArrow/> : <DownArrow/>}
        </MenuControl>

        {open && 
        <DropDown>
            {playlists.map(playlist => 
            <Playlist 
                key={playlist.id}
                name={playlist.id}>
                {playlist.name.length < 20 ? playlist.name : shortenName(playlist.name)}
                <PlaylistControls>
                    <List handleView={handleView} id={playlist.id}/>
                    <Play handlePlay={handlePlay} id={playlist.id}/>
                </PlaylistControls>
                </Playlist>)}
        </DropDown>
        }
        </>
    )
}