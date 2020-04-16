export const reacciones = {
  REDONDEAR: '🔄',
  SLACK: '💬',
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
};

export const reaccionesVisibles = [
  reacciones.THUMBS_UP,
  reacciones.THUMBS_DOWN,
  reacciones.SLACK,
  reacciones.REDONDEAR,
];

export function colorForReaccionDarker(reaccion) {
  switch (reaccion) {
    case reacciones.THUMBS_UP: {
      return '#90BBF3';
    }
    case reacciones.THUMBS_DOWN: {
      return '#FED2D6';
    }
    case reacciones.SLACK: {
      return '#FFE8CE';
    }
    case reacciones.REDONDEAR: {
      return '#97E2CF';
    }
    default: {
      return 'black';
    }
  }
}

export function colorForReaccion(reaccion) {
  switch (reaccion) {
    case reacciones.THUMBS_UP: {
      return '#68A1EA';
    }
    case reacciones.THUMBS_DOWN: {
      return '#FFB3BA';
    }
    case reacciones.SLACK: {
      return '#FFDFBA';
    }
    case reacciones.REDONDEAR: {
      return '#68C9B2';
    }
    default: {
      return 'black';
    }
  }
}
