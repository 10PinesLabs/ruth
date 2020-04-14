import styled from "styled-components";

const SSkeletonPulse = styled.div`
 display: inline-block;
  height: 100%;
  width: 100%;
  background:linear-gradient(-90deg, #C1C1C1 0%, #F8F8F8 50%, #C1C1C1 100%);
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

export const SkeletonLine = styled(SSkeletonPulse)`
  width: 80%;
  height: 1em;
  border-radius: 5px;

  &::before {
    content: "00a0";
    color:transparent;
  }
`;

export const SkeletonBlock = styled(SSkeletonPulse)`
  width: 100%;
  border-radius: 5px;

  &::before {
    content: "00a0";
    color:transparent;
  }
`;

export const SkeletonCircle = styled(SSkeletonPulse)`
  border-radius: 50%;

  &::before {
    content: "00a0";
    color:transparent;
  }
`;

export const ReactionSkeletonContainer = styled.div`
    height: 3.5em;
    width: 3.5em;
    margin-bottom: 1em;
    margin-right: 1em;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: rgb(130, 130, 130) 4px 4px 10px, rgb(255, 255, 255) -4px -4px 10px;
    background: 'linear-gradient(145deg, rgb(230, 230, 230), rgb(200, 200, 200))';
`;

