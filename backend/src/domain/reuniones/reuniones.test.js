import request from 'supertest';
import ReunionesRepo from '~/domain/reuniones/repo';
import app from '~/server';
import db from '~/database/models';
import TemasRepo from '~/domain/temas/repo';

const temaGenerico = {
  autor: 'Ailen Muñoz',
  cantidadDeMinutosDelTema: 60,
  createdAt: new Date().toISOString(),
  descripcion: ':)',
  duracion: 'MEDIO',
  id: 1,
  linkDePresentacion: null,
  mailDelAutor: null,
  obligatoriedad: 'OBLIGATORIO',
  prioridad: 2,
  propuestas: null,
  reunionId: 1,
  temasParaRepasar: null,
  tipo: 'conDescripcion',
  titulo: 'HOla hola',
  updatedAt: new Date().toISOString(),
};

jest.mock('../login/estaLogueado', () => () => true);

describe('para reuniones cerradas', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('si no hay devuelve una lista vacia', async () => {
    const reunionesRepo = new ReunionesRepo();
    const repoTemas = new TemasRepo();
    const reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'saraza' });
    await repoTemas.guardarTemas(reunionCerrada, [temaGenerico]);

    const reunionesCerradas = await request(app).get('/api/reuniones/cerradas');

    expect(reunionesCerradas.body.reuniones.length).toEqual(1);
    expect(reunionesCerradas.body.reuniones[0].id).toEqual(reunionCerrada.id);
    expect(reunionesCerradas.body.reuniones[0].temas[0].id).toEqual(temaGenerico.id);
  });
});
