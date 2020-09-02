import fetch from 'node-fetch';

function getTemasRootsDeVerdad() {
  const temasRootsHost = process.env.TEMAS_ROOTS_HOST;
  const temasRootsApiKey = process.env.TEMAS_ROOTS_API_KEY;

  return fetch(`${temasRootsHost}/api/v2/temas?apiKey=${temasRootsApiKey}`).then(
    (response) => response.json(),
  );
}

function getTemasRootsMock() {
  return Promise.resolve(
    // eslint-disable-next-line import/prefer-default-export
    require('./temas-fixture.json'),
  );
}

const getTemasRoots = process.env.NODE_ENV === 'test' ? getTemasRootsMock : getTemasRootsDeVerdad;

const urlApiMinutaDeTema = (temaId) => `/api/v2/temas/${temaId}/temaDeMinuta?apiKey=${process.env.TEMAS_ROOTS_API_KEY}`;

const actualizarMinutaDeTema = async (requester, tema) => {
  if (process.env.NODE_ENV === 'test') return;
  console.log('Se realiza el envio de minutas de ', tema);
  requester.patch(process.env.TEMAS_ROOTS_HOST + urlApiMinutaDeTema(tema.votacionDeRootsId), {
    fueTratado: true,
  }).catch((error) => {
    console.log('El envio de la minuta resulto en un error', error);
  });
};


const VotacionCliente = {
  getTemasRoots,
  actualizarMinutaDeTema,
};

export default VotacionCliente;
