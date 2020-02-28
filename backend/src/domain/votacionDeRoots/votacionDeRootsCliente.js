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

const VotacionCliente = {
  getTemasRoots,
};

export default VotacionCliente;
