import { PlaylistControl } from "../components/Header/PlaylistMenu-styles";


export default function Play({handlePlay, id, size}){

    return (


        <PlaylistControl
            onClick={() => handlePlay(id)}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M15 12.3301L9 16.6603L9 8L15 12.3301Z" fill="currentColor" />
        </PlaylistControl>

    )
}