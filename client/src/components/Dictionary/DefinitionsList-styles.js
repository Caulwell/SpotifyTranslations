import styled from "styled-components";

export const Definitions = styled.div`
padding: 0 0.5rem;
display: flex;
flex-direction: column;
`;

export const Definition = styled.div`
    background-color: ${props => props.theme.lightPrimary};
    height: 8rem;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
`;

export const DefinitionNumber = styled.div`
    font-size: 4rem;
    margin-right: 2rem;
`;

export const DefinitionTitle = styled.div`
    display: flex;
`;

export const TitleItem = styled.div`
    margin-right: 3rem;
`;

export const DefinitionBody = styled.div`
    display: flex;
`;

export const DefinitionControls = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledSVG= styled.svg`
fill: ${props => props.theme.text };
opacity: ${props => props.active ? 1 : 0.5};
margin-bottom: 2rem;
&:hover {
    cursor: ${props => props.active ? "pointer": "auto"};
}
`;

