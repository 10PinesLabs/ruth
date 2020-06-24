import context from '~/context';

export default {

  notificarOwnersDeActionItemsDeReunion: (temasDeReunion) => {
    temasDeReunion.forEach((tema) => {
      tema.actionItems.forEach((actionItemEvent) => {
        const { actionItem } = actionItemEvent;
        actionItem.owners.forEach((owner) => {
          context.mensajeador.enviarMensaje(owner, `Fuiste asignado a un aciton item\n>${actionItem.descripcion}`);
        });
      });
    });
  },

};
