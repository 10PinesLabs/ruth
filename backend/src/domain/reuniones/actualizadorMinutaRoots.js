
const urlApiMinutaDeTema = (temaId) => `/api/v1/temas/${temaId}/temaDeMinuta`;
const actualizarTemaTratadoEnRoots = (requester, tema) => {
  requester.patch(urlApiMinutaDeTema(tema.id), {
    fueTratado: true,
  });
};

export default actualizarTemaTratadoEnRoots;
