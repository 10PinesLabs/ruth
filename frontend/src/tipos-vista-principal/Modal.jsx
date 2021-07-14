import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { Button, SecondaryButton } from '../components/Button.styled';
import './modal.css';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const ModalDeConfirmacion = ({
  title, open, onClose, onConfirm, cancelText = 'Cancelar', confirmText = 'Confirmar', children,
}) => (
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
        {title}
      </Typography>
    </DialogTitle>
    {
      children
    }
    <DialogActions>
      <SecondaryButton onClick={ onClose }>
        {cancelText}
      </SecondaryButton>
      <Button onClick={ () => {
        onConfirm().finally(onClose);
      } } color="primary" autoFocus>
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
);
