import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, SecondaryButton } from "../components/Button.styled";
import { Typography } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import './modal.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TerminarTemaDialog = ({ open, onClose, onConfirm }) => (
  <Dialog
    open={ open }
    onClose={ onClose }
    TransitionComponent={Transition}
    keepMounted
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" disableTypography>
      <Typography variant="h4" className="modal-title">
        ¿Terminar tema?
      </Typography>
    </DialogTitle>
    <DialogActions>
      <SecondaryButton onClick={ onClose }>
        Cancelar
      </SecondaryButton>
      <Button onClick={ () => {
        onClose();
        onConfirm()
      } } color="primary" autoFocus>
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
);
