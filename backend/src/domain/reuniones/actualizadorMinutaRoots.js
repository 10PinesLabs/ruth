
const urlApiMinutaDeTema = (temaId) => `/api/v1/temas/${temaId}/temaDeMinuta`;
const actualizarTemaTratadoEnRoots = (requester, tema) => {
  requester.patch(process.env.TEMAS_ROOTS_HOST + urlApiMinutaDeTema(tema.id), {
    fueTratado: true,
  });
};

export default actualizarTemaTratadoEnRoots;
