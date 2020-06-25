import context from '~/context';

const listaDeOwners = (owners) => owners.map((owner) => `${owner.usuario}`).join(',');

const mensaje = (descripcion, owners) => `Fuiste asignado a un aciton item\n>${descripcion}\n>Owners:${listaDeOwners(owners)}`;

export default {

  notificarOwnersDeActionItemsDeReunion: (temasDeReunion) => {
    temasDeReunion.forEach((tema) => {
      tema.actionItems.forEach((actionItemEvent) => {
        const { actionItem } = actionItemEvent;
        actionItem.owners.forEach((owner) => {
          const mensajeAEnviar = mensaje(actionItem.descripcion, actionItem.owners);
          if (process.env.MESSAGE_TESTING === 'false') {
            context.mensajeador.enviarMensajeDirecto(owner, mensajeAEnviar);
          } else {
            context.mensajeador.mensajeTest(`Mensaje enviado a:@${owner.usuario}\n${mensajeAEnviar}`);
          }
        });
      });
    });
  },

};
