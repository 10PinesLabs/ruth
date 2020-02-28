import { pick } from 'lodash';

export default function sanitizar(objeto) {
  return pick(objeto, ['tipo', 'titulo', 'descripcion', 'duracion', 'autor', 'obligatoriedad',
    'linkDePresentacion', 'propuestas', 'temasParaRepasar', 'cantidadDeMinutosDelTema', 'prioridad', 'mailDelAutor']);
}
