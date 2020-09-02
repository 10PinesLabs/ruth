import { pick } from 'lodash';

export default function sanitizar(temaDeReunionDeVotacionDeRoots) {
  const temaSanitizado = pick(temaDeReunionDeVotacionDeRoots, ['id', 'tipo', 'titulo', 'descripcion', 'duracion', 'autor', 'obligatoriedad',
    'linkDePresentacion', 'propuestas', 'temasParaRepasar', 'cantidadDeMinutosDelTema', 'prioridad', 'mailDelAutor']);
  temaSanitizado.votacionDeRootsId = temaSanitizado.id;
  delete temaSanitizado.id;
  return temaSanitizado;
}
