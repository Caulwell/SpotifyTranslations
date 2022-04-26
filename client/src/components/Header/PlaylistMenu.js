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

    const handleClickView = (id) => {
        handleView(id);
        setOpen(!open);
    };

    const handleClickPlay = (id) => {
        handlePlay(id);
        setOpen(!open);
    };


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
                    <List name="view" handleView={handleClickView} id={playlist.id}/>
                    <Play name="play" handlePlay={handleClickPlay} id={playlist.id}/>
                </PlaylistControls>
                </Playlist>)}
        </DropDown>
        }
        </>
    )
}