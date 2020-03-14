import React from "react";
import {PageContainer, Titulo} from "./CommonPages.styled";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSpring} from "react-spring";

const Loading = () => {
  const props = useSpring({
    opacity: 1,
    from: {opacity: 0},
  });
  return (
    <PageContainer style={props}>
    <Titulo> Cargando </Titulo>
    <CircularProgress />
  </PageContainer>)
};

export default Loading;
