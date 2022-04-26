import styled from "styled-components";


export const  MenuControl = styled.div`
    padding: 0.5rem;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

`;

export const  StyledSVG= styled.svg`
fill: ${props => props.theme.text};
`;



export const  DropDown = styled.ul`
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    list-style-type: none;
    position: absolute;
    top: 2rem;
    right: 0.2rem;
    background-color: ${props => props.theme.lighter};
    max-height: 30rem;
    overflow-y: auto;
    z-index: 99;
    &::-webkit-scrollbar-track
    {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: ${props => props.theme.body};
    }
    &::-webkit-scrollbar
    {
        width: 12px;
        background-color: ${props => props.theme.body};
    }
    &::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: ${props => props.theme.midPrimary};
    }
    `;

export const  Playlist = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    margin: 0;
    
`;

export const  PlaylistControls = styled.div`
    display: flex;
`;

export const  PlaylistControl = styled.svg`
    fill: ${props => props.theme.text};
    cursor: pointer;
    &:hover{
        fill:${props => props.theme.flair};
    }
`;