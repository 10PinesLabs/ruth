import { createEvent } from './evento';

export const reunionEventoTypes = {
  EMPEZAR_REUNION:'Una reunion es comenzada' 
}

export const reunionEventos = {
  comenzarReunion: (reunion) => createEvent(reunionEventoTypes.EMPEZAR_REUNION, {reunion, comesFromWS:true})
}
