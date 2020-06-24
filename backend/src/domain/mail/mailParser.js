const componerMailResumen = (reunion, temas) => {
  const fueTratado = (tema) => tema.inicio != null;
  const temasAListar = temas.filter((tema) => fueTratado(tema));

  const listaTemas = () => `Temas: <ul>${temas.map((tema) => `<li>${fueTratado(tema) ? `<bold>${tema.titulo}</bold>` : `${tema.titulo}`}</li>`)} </ul>`;

  const fechaReunion = (date) => date.getDate().toString().concat(`-${
    (date.getMonth() + 1).toString()}`).concat(`-${
    date.getFullYear().toString()}`);

  const emojisReacciones = {
    'Thumbs up': 128077,
    'Thumbs down': 128078,
    'Seguirlo por slack': 128260,
    Redondear: 128260,
  };

  const cantidadReacciones = (stringReaccion, reacciones) => {
    const emoji = String.fromCodePoint(emojisReacciones[stringReaccion]);
    if (emoji in reacciones) {
      return reacciones[emoji].length;
    }
    return 0;
  };

  const reaccionesATema = (tema) => `Reacciones: <ul>
  <li>Thumbs up: ${cantidadReacciones('Thumbs up', tema.reacciones)}</li>
  <li>Thumbs down: ${cantidadReacciones('Thumbs down', tema.reacciones)}</li>
  <li>Seguirlo por slack: ${cantidadReacciones('Seguirlo por slack', tema.reacciones)}</li>
  <li>Redondear: ${cantidadReacciones('Redondear', tema.reacciones)}</li>
  </ul>`;

  const reaccionesAOrador = (orador) => `Reacciones: <ul>
  <li>Thumbs up: ${orador.reacciones.thumbsUp.length}</li>
  <li>Thumbs down: ${orador.reacciones.thumbsDown.length}</li>
  <li>Redondear: ${orador.reacciones.redondeando.length}</li></ul>`;

  const oradores = (tema) => {
    const timeStampElapsed = (fin, inicio) => Math.ceil((fin - inicio) / 1000);

    const parsearTiempoHablando = (orador) => `Tiempo hablando: ${
      Math.floor(Math.abs(timeStampElapsed(orador.fin, orador.inicio)) / 60)
    } minutos, ${
      (`0${Math.abs(timeStampElapsed(orador.fin, orador.inicio)) % 60}`).slice(-2)
    } segundos.`;

    return (`Debate: <ul>${tema.oradores.pasados.map((orador) => `<li>${orador.usuario.nombre} <br>${parsearTiempoHablando(orador)}<br>Resumen: ${orador.resumen}<br>${reaccionesAOrador(orador)}</li>`)}</ul>`);
  };
  const actionItems = (tema) => `Action items: <ul>${tema.actionItems.map((actionItem) => `
      <li>${actionItem.actionItem.descripcion}. Owners: ${actionItem.actionItem.owners}`)}</ul>`;

  const temasDeReunion = () => temasAListar.map((tema) => `<h2>Titulo: ${tema.titulo}</h2>
    <p>Descripcion: ${tema.descripcion}</p>
    <p>Conclusion: ${tema.conclusion}</p>
    ${reaccionesATema(tema)}
    ${oradores(tema)}
    ${actionItems(tema)}`);

  return `<h1> Reunion ${fechaReunion(reunion.dataValues.updatedAt)} </h1>
    ${listaTemas(temas)}
    ${temasDeReunion(temas)}`;
};

export default componerMailResumen;
