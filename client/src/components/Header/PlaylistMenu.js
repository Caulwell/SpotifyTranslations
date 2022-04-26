import { useEffect, useState } from "react";

import { MenuControl, StyledSVG, DropDown, Playlist, PlaylistControls, PlaylistControl } from "./PlaylistMenu-styles";



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
            {open ? 
                <StyledSVG
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
                        fill="currentColor"
                />
                </StyledSVG>
            
            :
            

            <StyledSVG
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                    fill="currentColor"
            />
            </StyledSVG>

            }
        </MenuControl>

        {open && 
        
        <DropDown>
            {playlists.map(playlist => <Playlist 
                                        name={playlist.id}>
                                        {playlist.name.length < 20 ? playlist.name : shortenName(playlist.name)}
                                        <PlaylistControls>
                                            <PlaylistControl
                                                onClick={() => handleView(playlist.id)}
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path d="M9 7H7V9H9V7Z" fill="currentColor" />
                                                <path d="M7 13V11H9V13H7Z" fill="currentColor" />
                                                <path d="M7 15V17H9V15H7Z" fill="currentColor" />
                                                <path d="M11 15V17H17V15H11Z" fill="currentColor" />
                                                <path d="M17 13V11H11V13H17Z" fill="currentColor" />
                                                <path d="M17 7V9H11V7H17Z" fill="currentColor" />
                                            </PlaylistControl>
                                            <PlaylistControl
                                                onClick={() => handlePlay(playlist.id)}
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                >
                                                <path d="M15 12.3301L9 16.6603L9 8L15 12.3301Z" fill="currentColor" />
                                            </PlaylistControl>
                                        </PlaylistControls>
                                        
                                        
                                        </Playlist>)}
        </DropDown>
        }

        

        </>
    )
}