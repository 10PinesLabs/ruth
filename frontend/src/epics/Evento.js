import {
  filter, flatMap, map, mapTo, tap,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import Backend from '../api/backend';
import { stateEventoTypes } from '../store';

export const publishEventType = 'PUBLICAR_EVENTO';

export const publicarEvento = (action$, state$) => action$
  .pipe(
    ofType(publishEventType),
    filter(() => {
      const state = state$.value;
      return !state.esperandoConfirmacionDeEvento && !state.esperandoEventoId;
    }),
    map((action) => ({ type: stateEventoTypes.INICIAR_ENVIO, payload: action.payload })),
  );

export const enviarEvento = (action$, state$) => action$
  .pipe(
    ofType(stateEventoTypes.INICIAR_ENVIO),
    flatMap(async (action) => {
      try {
        await Backend.publicarEvento({ ...action.payload, reunionId: state$.value.reunion.id });
        return { type: stateEventoTypes.ENVIO_CONFIRMADO };
      } catch (e) {
        return { type: stateEventoTypes.ENVIO_RECHAZADO };
      }
    }),
  );
