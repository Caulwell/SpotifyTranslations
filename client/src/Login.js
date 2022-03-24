import styled from "styled-components";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=82527983226848fc8ce7ebeb89e29f05&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const LoginPage = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const Button = styled.a`
    padding: 1rem;
    background: #28a745;
    color: white;
    text-decoration: none;
`;

export default function Login(){


   

    return (

        <LoginPage>
            <Button href={AUTH_URL}>Login With Spotify</Button>
        </LoginPage>

    )
}