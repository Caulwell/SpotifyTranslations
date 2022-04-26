import styled from "styled-components";

export const StyledLyrics = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const StyledLyric = styled.div`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem;
    margin-bottom: 0.2rem;
    background-color: ${props => props.selected ? props.theme.selected : props.theme.midPrimary};
    opacity: ${props => props.selected ? 1 : 0.8};
    border-radius: 3px;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: ${props => props.selected ? props.theme.flair : props.theme.text};
    transition: 0.3s;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

export const Original = styled.div`
    text-align: left;
`;

export const Translation = styled.div`
    text-align: right;
`;