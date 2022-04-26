import { LoginPage, Button } from "./Login-styles";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=82527983226848fc8ce7ebeb89e29f05&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";



export default function Login(){

    return (

        <LoginPage>
            <Button href={AUTH_URL}>Login With Spotify</Button>
        </LoginPage>

    )
}