import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";
import styled from "styled-components";


const spotifyApi = new SpotifyWebApi({
    clientId: "82527983226848fc8ce7ebeb89e29f05"
});

const StyledDashboard = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;
`;

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;


const StyledSearchBar = styled.input`
    padding: 0.5rem;
    flex-grow: 2;
    font-size: 2rem;
    border: none;
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
    &:focus {
        outline: none;
    }
`;

const StyledButton = styled.button`
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
    margin-left: 2rem;
`;

const StyledLyrics = styled.div`
    white-space: pre;
    display: flex;
    justify-content: center;
    text-align: center;
    overflow-y: auto;
`;

const StyledSearchResults = styled.div`
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
`;



export default function Dashboard({code, toggleTheme, isDarkTheme}){

    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");
    const [translation, setTranslation] = useState("");

    const chooseTrack = (track) => {
        setPlayingTrack(track);
        setSearch("");
        setLyrics("");
        setTranslation("");
    };

    // get lyrics
    useEffect(() => {
        if(!playingTrack) return;
        axios.get("http://localhost:3001/lyrics", {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        })
        .then(res => {
            setLyrics(res.data.lyrics);
            setTranslation(res.data.translation);
        });
    },[playingTrack]);

    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
        
        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if(cancel) return;
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image;
                  return smallest
                },
                track.album.images[0]
              )
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              };
            })
          );
        });

        return () => cancel = true;
    
      }, [search, accessToken]);


    return (
        <StyledDashboard>
            <StyledHeader>
                <StyledSearchBar 
                    type="text" 
                    placeholder="Search Songs/Artists..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    >

                </StyledSearchBar>
                <StyledButton onClick={toggleTheme}>
                    {isDarkTheme ?
                        <span aria-label="Light mode" role="img">🌞</span> :
                        <span aria-label="Dark mode" role="img">🌜</span>}
                </StyledButton>
               
            </StyledHeader>
            
            {searchResults.length === 0 ? 
                <StyledLyrics>
                        <div>
                        {lyrics}
                        </div>
                        <div>
                        {translation}
                        </div>
                    </StyledLyrics>
            
            : 

            <StyledSearchResults>
            {searchResults.map(track => {
                    return (
                        <TrackSearchResult
                            track={track}
                            key={track.uri}
                            chooseTrack={chooseTrack}
                        />
                    )
                })}

            </StyledSearchResults>
            }
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
            </div>
        </StyledDashboard>
    )
}