import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { colors } from '../styles/theme';
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

const useStyles = makeStyles(theme => ({
  tablaPinos: {
    width: "90%",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: theme.spacing(1),
    borderCollapse: "collapse",
    borderBottom: "2px solid rgba(0, 0, 0, 0.2)"
  },
  conclusionTextarea: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  conclusionForm: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(12)
  },
  conclusionTitle: {
    alignSelf: "flex-start",
    marginBlockEnd: 0  
  }
}));

export function TablaPinos(props) {
  const classes = useStyles();
  return <table className={classes.tablaPinos}>{props.children}</table>;
}

export function ConclusionTextarea(props) {
  const classes = useStyles();
  return <textarea {...props} className={classes.conclusionTextarea}>{props.children}</textarea>;
}

export function ConclusionForm(props) {
  const classes = useStyles();
  return <form {...props} className={classes.conclusionForm}>{props.children}</form>;
}

export function ConclusionTitle(props) {
  const classes = useStyles();
  return <h1 {...props} className={classes.conclusionTitle}>{props.children}</h1>;
}

export const BotonParaAbrirResumen = styled(Button)`
  && { 
    color: ${colors.primary};
    font-weight: bold;
    align-self: flex-start;
    margin-left: 10%;
  }
`;

export const ResumenOradorCollapseContainer = styled.div`
width:60%
`;
