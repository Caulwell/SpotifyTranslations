import PlaylistMenu from "./PlaylistMenu";
import { StyledHeader, StyledSearchBar, RightHeader } from "./Header-styles";
import Globe from "../../icons/Globe";
import Sun from "../../icons/Sun";
import Moon from "../../icons/Moon";


export default function Header({toggleTheme, isDarkTheme, setSearch, search, playlists, handleViewPlayList, handlePlayPlayList}){
    
    const handleView = id => {
        handleViewPlayList(id);
    };

    const handlePlay = id => {
        handlePlayPlayList(id);
    };
    
    return (
        <StyledHeader>
            <Globe/>
            <StyledSearchBar 
                type="text" 
                placeholder="Search for Artist/Song"
                value={search}
                onChange={e => setSearch(e.target.value)}
                >
            </StyledSearchBar>
            <RightHeader style={{display: "flex", justifyContent: "space-between"}}>
            <PlaylistMenu playlists={playlists} handlePlay={handlePlay} handleView={handleView}/>
            {isDarkTheme ?
                <Sun toggleTheme={toggleTheme}/>
                :
                <Moon toggleTheme={toggleTheme}/>
                }
            </RightHeader>
            
        </StyledHeader>
    )
}