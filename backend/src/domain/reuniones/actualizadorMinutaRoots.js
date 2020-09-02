
const urlApiMinutaDeTema = (temaId) => `/api/v2/temas/${temaId}/temaDeMinuta?apiKey=${process.env.TEMAS_ROOTS_API_KEY}`;
const actualizarTemaTratadoEnRoots = async (requester, tema) => {
  console.log('Se realiza el envio de minutas..');
  requester.patch(process.env.TEMAS_ROOTS_HOST + urlApiMinutaDeTema(tema.id), {
    fueTratado: true,
  }).then((result) => {
    console.log('El resultado del envio de la minuta es:', result);
  }).catch((error) => {
    console.log('El envio de la minuta resulto en un error', error);
  });
};

export default actualizarTemaTratadoEnRoots;
