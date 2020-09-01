
const urlApiMinutaDeTema = (temaId) => `/api/v2/temas/${temaId}/temaDeMinuta`;
const actualizarTemaTratadoEnRoots = async (requester, tema) => {
  requester.patch(process.env.TEMAS_ROOTS_HOST + urlApiMinutaDeTema(tema.id), {
    fueTratado: true,
  });
};

export default actualizarTemaTratadoEnRoots;
