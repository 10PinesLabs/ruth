import styled from 'styled-components';

export const MobileUsableArea = styled.div`
    width: 100%;
    overflow-y: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #DDDDDD;
    font-size: ${(props) => props.fontSize}px;
`;

export const TopSectionContainer = styled.div`
    width: 100%;
`;

export const LogoHeader = styled.div`
    width: 100%;
    height: 2em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #DDDDDD;
`;

export const Logo = styled.img`
    height: 5em;
    width: 5em;
    margin-right: 0.5em;
    object-fit: contain;
`;

export const LogoLabel = styled.div`
    font-family: 'Poppins', sans-serif;
    font-weight: 100;
`;

export const ParticipantsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 20em;
    width: 100%;
    height: 100%;
    //background: #BBBBBB;
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBvqFqZpJ08P0JcheadQG6O7Cln-SZauMu9CiqKJzHRKmcOEkY");
    box-shadow: inset 0px 35px 17px -37px rgba(0,0,0,1);
`;

export const ActionContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 2em;
    width: 100%;
`;

export const QueuedParticipants = styled.div`
    position: absolute;
    top: -1.3em;
    right: -0.5em;
    margin-top: 1em;
    margin-left: 2em;
    display: flex;
    justify-content: space-between;
    padding: 0.5em;
    border-radius: 50%;
    align-items: center;
    height: 1em;
    background: linear-gradient(145deg, #c7c7c7, #ececec);
    box-shadow: rgb(130, 130, 130) 4px 4px 10px, rgb(255, 255, 255) -4px -4px 10px;
    pointer-events: none;
`;

export const SubjectTitle = styled.div`
    color: black; 
    font-size: 2em;
    font-weight: 500; 
    text-align: center;
    font-family: 'Poppins', sans-serif;
    &:before{
        color: grey; 
        font-size: 0.75em;
        font-weight: 300; 
        text-align: center;
        font-family: 'Poppins', sans-serif;
        content:"tema ";
    }
`;

export const TemaNoEmpezado = styled.div`
    margin: 0.5em 0 0 0;
    font-size: 2em;
    font-weight: 200; 
    text-align: center;
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6rem;
    width: 70%;
    font-weight: bold;
`;

export const MicrophoneContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const ParticipantsCounter = styled.span`
    color: silver;
    font-size: 0.9em;
    margin-right: 0.3em;
    font-family: 'Poppins', sans-serif;

`;

export const ReactionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 45%;
    min-width: 200px;
    justify-content: space-evenly;
    height: ${(props) => props.height}rem;
`;

export const SpeakerAreaContainer = styled.div`
    height: 100%;
    display: flex;
    position:relative;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const CantidadDeOradores = styled.div`
    position:absolute;
    top:40%;
    left: -33%;
    color:gray;
`
