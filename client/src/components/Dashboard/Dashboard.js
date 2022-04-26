import useAuth from "../../useAuth";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../LyricsContainer/TrackSearchResult";
import Player from "../Player/Player";
import axios from "axios";
import LyricsContainer from "../LyricsContainer/LyricsContainer";
import Header from "../Header/Header";
import Dictionary from "../Dictionary/Dictionary";

import { StyledDashboard, StyledMain, StyledSearchResults } from "./Dashboard-styles";


const spotifyApi = new SpotifyWebApi({
    clientId: "82527983226848fc8ce7ebeb89e29f05"
});


export default function Dashboard({code, toggleTheme, isDarkTheme}){

    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [trackURIs, setTrackURIs] = useState(null);
    const [playingTrack, setPlayingTrack] = useState(null);

    const [lyrics, setLyrics] = useState("");
    const [dictionaryOpen, setDictionaryOpen] = useState(false);

    const [selectedLine, setSelectedLine] = useState("");
    const [playlists, setPlaylists] = useState();

    const getSmallestAlbumCover = (track) => {

       return track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
    };

    const chooseTrack = (track) => {
        setSearch("");
        setSearchResults([]);
        setLyrics("");
        setTrackURIs([track.uri]);
        
    };

    const updateTrack = track => {
        setPlayingTrack(track);
    }

    const handleSelectLyric = (e) => {
        setSelectedLine(lyrics[e.currentTarget.getAttribute("name")]);
        setDictionaryOpen(true);
    };

    const handleViewPlaylist = id => {
        spotifyApi.getPlaylist(id)
            .then(res => {

                const tracks = res.body.tracks.items.map(el => {

                    const smallestAlbumImage = getSmallestAlbumCover(el.track)
                    return {
                        artist: el.track.artists[0].name,
                        title: el.track.name,
                        uri: el.track.uri,
                        albumUrl: smallestAlbumImage.url,
                    };
                });
                setSearchResults(tracks);
            });
    };

    const handlePlayPlaylist = id => {

        spotifyApi.getPlaylist(id)
            .then(res => {
                const trackURIs = res.body.tracks.items.map(el => {
                    return el.track.uri;
                });
                setTrackURIs(trackURIs);
            });
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
            setDictionaryOpen(false);
        });
    },[playingTrack]);

    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getMe()
            .then(res =>{
                spotifyApi.getUserPlaylists(res.body.display_name)
                    .then(response => {
                        setPlaylists(response.body.items);
                    })
                    .catch(error => console.log(error));
            })
            .catch(err => console.log(err));

    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;
        let cancel = false;
        spotifyApi.searchTracks(search).then(res => {
            if(cancel) return;
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = getSmallestAlbumCover(track);
    
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
            <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} setSearch={setSearch} search={search} playlists={playlists} handlePlayPlayList={handlePlayPlaylist} handleViewPlayList={handleViewPlaylist}/>
           <StyledMain>
            {/* song selected and lyrics retrieved from server and shown */}
            {searchResults.length === 0 && lyrics ? 
                <>
                    <LyricsContainer 
                        lyrics={lyrics} 
                        handleSelectLyric={handleSelectLyric} 
                        selectedLine={selectedLine}
                        dictionaryOpen={dictionaryOpen}
                        />
                    { dictionaryOpen && <Dictionary selectedLine={selectedLine} setDictionaryOpen={setDictionaryOpen}/> }

                </>
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
            
            </StyledMain>
           
            <div>
                <Player accessToken={accessToken} trackUri={trackURIs} updateTrack={updateTrack}/>
            </div>
        </StyledDashboard>
    )
}