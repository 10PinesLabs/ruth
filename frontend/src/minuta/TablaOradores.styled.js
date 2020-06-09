import {TableCell, TableRow} from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styled from "styled-components";

export const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#d2d2d2",
    color: "#5c5c5c",
    fontWeight: "bold"
  },
  body: {
    fontSize: 14,
    padding: "5px",
    height: "40px",
    verticalAlign: "top",
    paddingTop: "15px",
    paddingBottom: "15px"
  },
}))(TableCell);

export const OradorActualContainer = styled.div`
  display:flex;
  justify-content: space-between;
  align-items:center;
  min-width:150px !important;
`;