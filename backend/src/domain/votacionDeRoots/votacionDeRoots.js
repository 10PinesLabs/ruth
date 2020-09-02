import Cliente from './votacionDeRootsCliente';

const VotacionDeRoots = {
  getTemasRoots: () => Cliente.getTemasRoots(),
  actualizarMinutaDeTema: (requester, tema) => Cliente.actualizarMinutaDeTema(requester, tema),
};

export default VotacionDeRoots;
