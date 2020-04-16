import { colors } from '../styles/theme';

export const reacciones = {
  REDONDEAR: '🔄',
  SLACK: '💬',
  THUMBS_UP: '👍',
  THUMBS_DOWN: '👎',
};


export function colorForReaccion(reaccion) {
  switch (reaccion) {
    case reacciones.THUMBS_UP: {
      return '#68a1ea';
    }
    case reacciones.THUMBS_DOWN: {
      return '#ffb3ba';
    }
    case reacciones.SLACK: {
      return '#ffdfba';
    }
    case reacciones.REDONDEAR: {
      return colors.primary;
    }
    default: {
      return 'black';
    }
  }
}
