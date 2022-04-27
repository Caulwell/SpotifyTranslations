import styled from "styled-components";

export const StyledTrack = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
    margin: 0 0.3rem 1.5rem 0;
    transition: 0.3s;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        cursor: pointer;
    }
`;

export const TrackHeader = styled.div`
    display: flex;
    align-items: center;
`;

export const TrackNumber = styled.div`
    opacity: 0.8;
    font-size: 1.5rem;
    margin-right: 1rem;
`;

export const Image = styled.img`
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;
`;

export const TrackDetails = styled.div`
    display: flex; 
    align-items: center;
`;

export const TrackName = styled.h4`
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
    margin-right: 1rem;
    padding: 0;
`;

export const TrackArtist = styled.h5`
    opacity: 0.8;
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    padding: 0
`;
