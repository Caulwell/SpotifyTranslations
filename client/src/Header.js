import styled from "styled-components"


const StyledHeader = styled.div`
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
`;

const StyledButton = styled.button`
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
`;


export default function Header({toggleTheme, isDarkTheme}){


    return (
        <StyledHeader>
            <StyledButton onClick={toggleTheme}>
            {isDarkTheme ?
                <span aria-label="Light mode" role="img">🌞</span> :
                <span aria-label="Dark mode" role="img">🌜</span>}
            </StyledButton>
        </StyledHeader>
    )
}