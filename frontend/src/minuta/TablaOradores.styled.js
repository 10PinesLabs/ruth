import {TableCell} from "@material-ui/core";
import { withStyles} from '@material-ui/core/styles';
import styled from "styled-components";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import {colors} from "../styles/theme";


const fontSize = 14;

export const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: colors.black30,
    color: "#5c5c5c",
    fontWeight: "bold",
    fontFamily: "inherit",
    fontSize
  },
  body: {
    fontSize,
    fontFamily: "inherit",
    height: "40px",
    verticalAlign: "center",
    paddingTop: "1em",
    paddingBottom: "1em"
  },
}))(TableCell);


const useStyles = makeStyles(theme => ({
  oradorActualContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: theme.spacing(20),
  }
}));

export function OradorActualContainer({children}) {
  const classes = useStyles();
  return <div className={classes.oradorActualContainer}>{children}</div>;
}

export const FlexVerticalCenterSpaceAround = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

