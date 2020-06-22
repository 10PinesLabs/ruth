import styled from 'styled-components';
import { Button, Tabs, Box, Tab } from '@material-ui/core';
import { colors } from '../styles/theme';
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

const useStyles = makeStyles(theme => ({
  tablaPinos: {
    width: "100%",
    alignSelf: "center",
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
    justifyContent: "center"
  },
  conclusionTitle: {
    alignSelf: "flex-start"
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
  }
`;

export const TabsHeader = ({handleTabChange,value,children}) => {

  const useStyles = makeStyles(({spacing}) => ({
      flexContainer: {
        borderRadius: spacing(0.5),
        border: "1px solid rgba(0,0,0,0.2)"
      },
      indicator: {
        backgroundColor: colors.primary
      },
      selected: {
        color: colors.primary
      }
    })
  );
  
  return (
    <Box
      borderRadius={"borderRadius"}
      m={2}
      width={"100%"}
      boxShadow={2}
    >
      <Tabs
        classes={useStyles()}
        variant="fullWidth"
        value={value}
        onChange={handleTabChange}
      >
        {children}
      </Tabs>
    </Box>
  )
};

export const CustomTab = (props) => {
  const useStyles = makeStyles({
    wrapper: {
      fontWeight: "bold",
    },
    selected: {
      color: colors.primary
    }
  });
  
  return (
    <Tab {...props} classes={useStyles()}/>
  )
};

export const ResumenOradorCollapseContainer = styled.div`
width:60%
`;

export const TabContainer =  styled.div(({value,index}) => `
display: ${(value === index)? "flex": "none"};
flex-direction: column;
flex: 1;
align-items: center;
width: 100%;
`);
