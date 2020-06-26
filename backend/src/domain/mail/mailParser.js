const componerMailResumen = (reunion, temas, fecha) => {
  const fueTratado = (tema) => tema.inicio != null;
  const temasAListar = temas.filter((tema) => fueTratado(tema));

  const listaTemas = () => `Temas: <ul>${temas
    .map((tema) => `<li>${fueTratado(tema) ? `<bold>${tema.titulo}</bold>` : `${tema.titulo}`}</li>`).join('')} </ul>`;

  const emojisReacciones = {
    'Thumbs up': 128077,
    'Thumbs down': 128078,
    'Seguirlo por slack': 128260,
    Redondear: 128260,
  };

  const posiblesReaccionesATema = [
    'Thumbs up',
    'Thumbs down',
    'Seguirlo por slack',
    'Redondear',
  ];

  const cantidadReacciones = (stringReaccion, reacciones) => {
    const emoji = String.fromCodePoint(emojisReacciones[stringReaccion]);
    if (emoji in reacciones) {
      return reacciones[emoji].length;
    }
    return 0;
  };

  const reaccionesATema = (tema) => `Reacciones: <ul>
    ${posiblesReaccionesATema
    .map((reaccion) => `<li>${reaccion}: ${cantidadReacciones(reaccion, tema.reacciones)}</li>`).join('')}
  </ul>`;

  const reaccionesAOrador = (orador) => `Reacciones: <ul>
  <li>Thumbs up: ${orador.reacciones.thumbsUp.length}</li>
  <li>Thumbs down: ${orador.reacciones.thumbsDown.length}</li>
  <li>Redondear: ${orador.reacciones.redondeando.length}</li></ul>`;

  const oradores = (tema) => {
    const timeStampElapsed = (fin, inicio) => Math.ceil((fin - inicio) / 1000);

    const minutosHablando = (orador) => Math
      .floor(Math.abs(timeStampElapsed(orador.fin, orador.inicio)) / 60);
    const segundosHablando = (orador) => (`0${Math.abs(timeStampElapsed(orador.fin, orador.inicio)) % 60}`).slice(-2);

    return (`Debate: <ul>${tema.oradores.pasados.map((orador) => `<li>${orador.usuario.nombre} 
        (${minutosHablando(orador)}:${segundosHablando(orador)})
        <br>Resumen: ${orador.resumen}
        <br>${reaccionesAOrador(orador)}</li>`)}
      </ul>`);
  };
  const actionItems = (tema) => `Action items: <ul>${tema.actionItems.map(({ actionItem }) => `
      <li>${actionItem.descripcion}. Owners: ${actionItem.owners.map(({ nombre }) => nombre).join(', ')}`)}</ul>`;

  const temasDeReunion = () => temasAListar.map((tema) => `<h2>Titulo: ${tema.titulo}</h2>
    <p>Descripción: ${tema.descripcion}</p>
    <p>Conclusión: ${tema.conclusion}</p>
    ${reaccionesATema(tema)}
    ${oradores(tema)}
    ${actionItems(tema)}`);

  return `<h1> Reunion ${fecha} </h1>
    ${listaTemas(temas)}
    ${temasDeReunion(temas)}`;
};

export default componerMailResumen;
