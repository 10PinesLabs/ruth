import React, {useEffect, useState} from 'react';
import ReactGoogleSlides from 'react-google-slides';
import {SlidesContainer} from './Presentacion.styled';
import {useSpring} from "react-spring";
import {SkeletonBlock} from "../skeleton/Skeleton.styled";

const Presentacion = ({tema}) => {
  const props = useSpring({opacity: 1, from: {opacity: 0}});
  const [showSkeleton, setShowSekelton] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowSekelton(false), 2500)
  }, []);

  return (
    <SlidesContainer style={props}>
      {showSkeleton ? <SkeletonBlock style={{width: '90%', height: '90%'}} /> :
        <ReactGoogleSlides width="90%"
                           height="90%" slidesLink={tema.linkDePresentacion}
                           slideDuration={20}
                           showControls/>}
    </SlidesContainer>
  );
};

export default Presentacion;
