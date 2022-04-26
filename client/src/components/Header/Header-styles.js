import styled from "styled-components"

export const StyledHeader = styled.div`

display: flex;
justify-content: space-between;
`;




export const StyledSVG= styled.svg`
margin-left: 2rem;
fill: ${props => props.theme.text};
&:hover {
    cursor: pointer;
}
`;


export const StyledSearchBar = styled.input`
padding: 1rem 4rem;
position: relative;
left: 6rem;
flex-grow: 2;
max-width: 12rem;
font-size: 1rem;
border-radius: 13px;
border: none;
text-align:center;
background: ${props => props.theme.lighter};
color: ${props => props.theme.text};
&:focus {
    outline: none;
}
`;

export const RightHeader = styled.div`
display: flex;
`;