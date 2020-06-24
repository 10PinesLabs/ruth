export default class DummyMessageService {
  constructor() {
    console.log('Inicializando servicio de mensajes dummy');
  }

  enviarMensaje({ email }, cuerpo) {
    console.log(`[MENSAJE DE PRUEBA]\n  ||Receptor:${email} \n  ||Cuerpo:${cuerpo}`);
  }
}
