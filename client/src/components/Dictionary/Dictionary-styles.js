
import styled from "styled-components";

export const StyledDictionary = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: ${props => props.theme.lighter};

    &::-webkit-scrollbar-track{
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

export const Heading = styled.div`
    background-color: ${props => props.theme.flair};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    color: ${props => props.theme.surfaceText}

`;

export const StyledSVG= styled.svg`
    fill: ${props => props.theme.text};
    &:hover {
        cursor: pointer;
    }
`;


export const WordContainer = styled.div`
    padding: 0 1rem;
    border-bottom: 1px solid white;
`;

export const WordButton = styled.button`
    margin-bottom: 0;
    z-index: 1;
    border: none;
    cursor: pointer;
    border-bottom: ${props => props.selected ? `2px solid ${props.theme.flair}` : "none"};
    margin-bottom: -1px;
    font-size: 1rem;
    height: 3rem;
    margin-right: 1rem;

    color: ${props => props.theme.text};
    background-color: transparent;
    
    
`;

export const DefinitionContainer = styled.div`
    padding: 1rem;
`;