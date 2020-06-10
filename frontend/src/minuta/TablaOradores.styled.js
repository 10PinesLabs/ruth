import {TableCell} from "@material-ui/core";
import { withStyles} from '@material-ui/core/styles';
import styled from "styled-components";

export const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#d2d2d2",
    color: "#5c5c5c",
    fontWeight: "bold",
    padding: "5px 16px 5px 16px",
    fontFamily: "inherit",
    fontSize: 14
  },
  body: {
    fontSize: 14,
    fontFamily: "inherit",
    padding: "5px",
    height: "40px",
    verticalAlign: "center",
    paddingTop: "15px",
    paddingBottom: "15px"
  },
}))(TableCell);

export const OradorActualContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 157px;
`;

export const FlexVerticalCenterSpaceAround = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

