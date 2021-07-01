import request from 'supertest';
import { response } from 'express';
import ReunionesRepo from '~/domain/reuniones/repo';
import app from '~/server';
import db from '~/database/models';
import TemasRepo from '~/domain/temas/repo';

const fechaDeHoy = new Date(Date.now());

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


jest.mock('../login/estaLogueado', () => () => true);

function assertTemaValido(reunion, response, temaGuardado) {
  const temaGenericoGuardado = {
    ...temaGenerico,
    id: temaGuardado.id,
    createdAt: temaGuardado.createdAt.toISOString(),
    updatedAt: temaGuardado.updatedAt.toISOString(),
    reunionId: reunion.id,
  };

  expect(response.body.reuniones[0].temas[0]).toEqual(temaGenericoGuardado);
}

describe('para reuniones', () => {
  let reunionesRepo;
  let repoTemas;
  let reunionCerrada;
  let reunionAbierta;
  let temasGuardadosCerrada;
  let temasGuardadosAbierta;

  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => fechaDeHoy.toISOString());
  });

  describe('si son cerradas', () => {
    test('y no hay reuniones cerradas devuelve una lista vacia', async () => {
      const response = await request(app).get('/api/reuniones?estaAbierta=false');

      expect(response.statusCode).toEqual(200);
      expect(response.body.reuniones).toEqual([]);
    });
  });


  describe('si son abiertas', () => {
    test('y no hay reuniones abiertas devuelve una lista vacia', async () => {
      const response = await request(app).get('/api/reuniones?estaAbierta=true');

      expect(response.statusCode).toEqual(200);
      expect(response.body.reuniones).toEqual([]);
    });
  });

  describe('para reuniones abiertas y cerradas', () => {
    beforeEach(async () => {
      reunionesRepo = new ReunionesRepo();
      repoTemas = new TemasRepo();
      reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'reunionCerrada' });
      reunionAbierta = await reunionesRepo.create({ abierta: true, nombre: 'reunionAbierta' });
      temasGuardadosCerrada = await repoTemas.guardarTemas(reunionCerrada, [temaGenerico]);
      temasGuardadosAbierta = await repoTemas.guardarTemas(reunionAbierta, [temaGenerico]);
    });

    test('si hay reuniones abiertas y cerradas y pido las cerradas', async () => {
      const response = await request(app).get('/api/reuniones?estaAbierta=false');

      expect(response.statusCode).toEqual(200);
      expect(response.body.reuniones.length).toEqual(1);
      expect(response.body.reuniones[0].id).toEqual(reunionCerrada.id);
      assertTemaValido(reunionCerrada, response, temasGuardadosCerrada[0]);
    });

    test('si hay reuniones abiertas y cerradas y pido las abiertas', async () => {
      const response = await request(app).get('/api/reuniones?estaAbierta=true');

      expect(response.statusCode).toEqual(200);
      expect(response.body.reuniones.length).toEqual(1);
      expect(response.body.reuniones[0].id).toEqual(reunionAbierta.id);
      assertTemaValido(reunionAbierta, response, temasGuardadosAbierta[0]);
    });
  });
});