import Cliente from './votacionDeRootsCliente';
import sanitizar from '~/domain/temas/sanitizar';

const VotacionDeRoots = {
  getTemasRoots: () => Cliente.getTemasRoots()
    .then((temas) => temas.map(sanitizar)),
};

export default VotacionDeRoots;
