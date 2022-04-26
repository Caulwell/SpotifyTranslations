import styled from "styled-components";

export const StyledDashboard = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 1rem;
box-sizing: border-box;
`;

export const StyledMain = styled.main`
display: flex;
flex-direction: column;
padding: 1rem 6rem;
max-height: 80vh;
overflow-y: auto;
scrollbar-gutter: stable;
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

export const DictionaryContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    padding: 0 0;
`;

export const ArrowContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledSearchResults = styled.div`
display: flex;
flex-direction: column;
margin-top: 3rem;
`;

export const SearchTitle = styled.div`
    display: flex;
    background-color: ${props => props.theme.body};
    z-index: 99; 
    justify-content: space-between;
    margin:-2rem 2rem 0 0;
    padding: 0 0 2rem 0;
    font-size: 2rem;
    position: fixed;
    width: 68vw;
`;