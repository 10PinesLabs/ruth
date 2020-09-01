
const urlApiMinutaDeTema = (temaId) => `/api/v2/temas/${temaId}/temaDeMinuta?apiKey=${process.env.TEMAS_ROOTS_API_KEY}`;
const actualizarTemaTratadoEnRoots = async (requester, tema) => {
  requester.patch(process.env.TEMAS_ROOTS_HOST + urlApiMinutaDeTema(tema.id), {
    fueTratado: true,
  });
};

export default actualizarTemaTratadoEnRoots;
