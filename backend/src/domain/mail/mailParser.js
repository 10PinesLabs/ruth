import ejs from 'ejs';

const componerMailResumen = (reunion, temas, fecha) => {
  const fueTratado = (tema) => tema.inicio != null;
  const temasAListar = temas.filter((tema) => fueTratado(tema));

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

  const timeStampElapsed = (fin, inicio) => Math.ceil((fin - inicio) / 1000);

  const minutosHablando = (orador) => Math
    .floor(Math.abs(timeStampElapsed(orador.fin, orador.inicio)) / 60);

  const segundosHablando = (orador) => (`0${Math.abs(timeStampElapsed(orador.fin, orador.inicio)) % 60}`).slice(-2);

  const tiempoHablando = (orador) => (`${minutosHablando(orador)}:${segundosHablando(orador)}`);

  const reaccionesATema = (tema) => (
    posiblesReaccionesATema.map((reaccion) => ({
      reaccion,
      cantidad: cantidadReacciones(reaccion, tema.reacciones),
    })));

  return (
    ejs.render(`
      <h1>Reunion <%= fecha %></h1>
      <p>Temas:</p> 
      <ul> 
        <% temas.forEach((tema) => { %>
            <li> <%= tema.titulo %> </li>
        <% }) %> 
      </ul>
      <% temasAListar.forEach((tema) => { %>
        <h2> <%= tema.titulo %> </h2>
        <p> Descripcion: <%= tema.descripcion %> </p>
        <p> Conclusion: <%= tema.conclusion %> </p>
        <p> Reacciones: </p>
        <ul>
            <% reaccionesATema(tema).forEach(({reaccion, cantidad}) => { %>
                <li> <%= reaccion %> : <%= cantidad %></li>
            <% }) %>
        </ul>
        <p>Debate:</p>
        <ul>
            <% tema.oradores.pasados.forEach((orador) => { %>
                <li> 
                    <p><%= orador.usuario.nombre %> (<%= tiempoHablando(orador) %>)</p>
                    <p>Resumen: <%= orador.resumen %></p>
                    <ul>
                          <li> Thumbs up: <%= orador.reacciones.thumbsUp.length %> </li>
                          <li> Thumbs down: <%= orador.reacciones.thumbsDown.length %> </li>
                          <li> Redondear: <%= orador.reacciones.redondeando.length %> </li>
                    </ul>
                </li>
            <% }) %>
        </ul>
        <p>Action items:</p>
        <ul>
            <% tema.actionItems.forEach(({ actionItem }) => { %>
                <li> <%= actionItem.descripcion %>. Owners: <%= actionItem.owners.nombre %> </li>
            <% }) %>
        </ul>
      <% }) %> 
    `, {
      fecha,
      temas,
      temasAListar,
      reaccionesATema,
      tiempoHablando,
    }, 'utf8')
  );
};

export default componerMailResumen;
