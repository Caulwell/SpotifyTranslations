import useAuth from "./useAuth";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";
import styled from "styled-components";
import LyricsContainer from "./LyricsContainer";
import Header from "./Header";
import LyricSelection from "./LyricSelection";


const spotifyApi = new SpotifyWebApi({
    clientId: "82527983226848fc8ce7ebeb89e29f05"
});

const StyledDashboard = styled.div`
    color: ${props => props.theme.text};
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;
`;

const StyledMain = styled.main`
    display: flex;
    max-height: 80vh;
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

    const [selectedLine, setSelectedLine] = useState("");

    const chooseTrack = (track) => {
        setSearch("");
        setLyrics("");
        setPlayingTrack(track);
        
    };

    const handleSelectLyric = (e) => {
        setSelectedLine(lyrics[e.currentTarget.getAttribute("name")]);
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
            setSelectedLine(res.data.lyrics[0]);
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
            <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} setSearch={setSearch} search={search}/>
            
            {/* song selected and lyrics retrieved from server and shown */}
            {searchResults.length === 0 && lyrics ? 


                <StyledMain>
                    <LyricsContainer lyrics={lyrics} handleSelectLyric={handleSelectLyric}/>
                    <LyricSelection selectedLine={selectedLine}/>
                </StyledMain>


            : 
            
            // search is active and search results are rendered
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