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
    min-height: 14em;
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
    width: 95%;
    height: 100%;
    border-radius: 40px;
    max-width: 30em;
    //background: #BBBBBB;
    background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBvqFqZpJ08P0JcheadQG6O7Cln-SZauMu9CiqKJzHRKmcOEkY");
    box-shadow: inset 4px 4px 8px #6b6b6b, inset -4px -4px 6px #d4d2d2;
`;

export const ActionContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 0.5em;
    width: 100%;
    min-height: 8em;
`;

export const QueuedParticipants = styled.div`
    position: absolute;
    top: 90%;
    right: 20;
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
    color: grey; 
    margin: 0.5em 0 0 0;
    font-size: 2em;
    font-weight: 200; 
    text-align: center;
    font-family: 'Poppins', sans-serif;
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
    justify-content: center;
    height: ${(props) => props.height}rem;
`;

export const TalkButton = styled.div(({pressed}) => `
    height: 6em;
    width: 6em;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1em;
    box-shadow: rgb(130, 130, 130) 4px 4px 10px, rgb(255, 255, 255) -4px -4px 10px;
    background: ${pressed? 'linear-gradient(145deg, rgb(114, 181, 114), rgb(205, 255, 205))' :
    'linear-gradient(145deg, rgb(230, 230, 230), rgb(200, 200, 200))'
    };
`);