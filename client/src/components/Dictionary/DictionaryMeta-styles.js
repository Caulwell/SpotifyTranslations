import styled from "styled-components"

export const StyledSVG= styled.svg`
fill: ${props => props.theme.text};
margin-right: 1rem;
&:hover {
    cursor: pointer;
}
`;

export const MetaInfo = styled.div`
display: flex;
justify-content: space-between;
background-color: ${props => props.theme.midPrimary};
border-radius: 3px;
padding: 0.5rem;
`;

export const SelectedWord = styled.h4`
    font-size: 2.5rem;
    margin: 0;
    margin-right: 2rem;
`;

export const WordInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 0 3rem 0 0;
`;

export const InfoButton = styled.a`
    display: flex;
    align-items: center;
    color: white;
    background-color: ${props => props.theme.flair};
    border: none;
    padding: 0 1rem;
    text-decoration: none;
`;