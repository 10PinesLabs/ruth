import request from 'supertest';
import { response } from 'express';
import ReunionesRepo from '~/domain/reuniones/repo';
import app from '~/server';
import db from '~/database/models';
import TemasRepo from '~/domain/temas/repo';
import EventosRepo from '~/domain/eventos/repo';

jest.mock('../login/estaLogueado', () => () => true);

const temaGenerico = {
  autor: 'Ailen Muñoz',
  cantidadDeMinutosDelTema: 60,
  descripcion: ':)',
  duracion: 'MEDIO',
  linkDePresentacion: null,
  mailDelAutor: null,
  obligatoriedad: 'OBLIGATORIO',
  prioridad: 2,
  propuestas: null,
  temasParaRepasar: null,
  tipo: 'conDescripcion',
  titulo: 'HOla hola',
};


describe('si una reunión está cerrada ', () => {
  let reunionesRepo;
  let reunionCerrada;
  let eventosRepo;
  let temasRepo;
  let temasGuardadosCerrada;

  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    reunionesRepo = new ReunionesRepo();
    reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'reunionCerrada' });
    temasRepo = new TemasRepo();
    temasGuardadosCerrada = await temasRepo.guardarTemas(reunionCerrada, [temaGenerico]);
    eventosRepo = new EventosRepo();
  });

  describe('y se quiere publicar un evento diferente al de cerrar reunión', () => {
    test('no debería poder hacerlo', async () => {
      const eventoReaccionar = {
        reunionId: reunionCerrada.id,
        type: 'Reaccionar',
        idTema: 44,
        nombre: '👍',
        usuario: { nombre: 'Pine Buena Onda', email: 'pine.buenaonda@10pines.com' },
      };

      const response = await request(app).post('/api/eventos').send(eventoReaccionar);

      expect(response.status).toEqual(400);
    });
  });
  describe('y se quiere publicar un evento diferente de cerrar reunión', () => {
    test('debería poder hacerlo', async () => {
      const eventoReaccionar = {
        reunionId: reunionCerrada.id,
        type: 'La reunion fue finalizada',
      };

      const response = await request(app).post('/api/eventos').send(eventoReaccionar);

      expect(response.status).toEqual(200);
    });
  });
});
