import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export const TerminarTemaDialog = ({ open, onClose, onConfirm }) => (
  <Dialog
    open={ open }
    onClose={ onClose }
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{ "Terminar tema?" }</DialogTitle>
    <DialogActions>
      <Button onClick={ onClose } color="primary">
        Cancelar
      </Button>
      <Button onClick={ () => {
        onClose();
        onConfirm()
      } } color="primary" autoFocus>
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
);
