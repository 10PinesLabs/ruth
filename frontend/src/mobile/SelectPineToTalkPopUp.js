import React from 'react';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const wantOtherToTalkContainerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: '1',
  background: 'rgb(0, 0, 0, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalContainerStyle = {
  width: '20rem',
  height: '10rem',
  background: '#1e1e1e',
  borderRadius: '10px',
  border: '1px solid white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};


export class SelectPineToTalkPopUp extends React.Component {
  render() {
    if (this.props.isDisabled) return null;
    return (
      <div style={wantOtherToTalkContainerStyle}>
        <div style={modalContainerStyle}>
          <span style={{
            color: 'white',
            textAlign: 'left',
            marginBottom: '1rem',
            fontWeight: '700',
          }}> Seleccioná un pino </span>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            defaultValue={'Elegí un pino'}
            value={this.props.selectedPine}
            onChange={this.props.handlePineChange}
            style={{
              background: 'white', width: '10rem', marginBottom: '1rem', paddingLeft: '1rem',
            }}
          >
            {this.props.availablePines.map((name) => (
                <MenuItem id={name} key={name} value={name}>
                  {name}
                </MenuItem>
            ))}
          </Select>
          <Button onClick={this.props.onExit} variant={'contained'} size={'large'}>
            Salir
          </Button>
        </div>
      </div>
    );
  }
}
