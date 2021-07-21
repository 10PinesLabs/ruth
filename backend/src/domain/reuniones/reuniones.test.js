import request from 'supertest';
import { response } from 'express';
import ReunionesRepo from '~/domain/reuniones/repo';
import app from '~/server';
import db from '~/database/models';
import TemasRepo from '~/domain/temas/repo';
import context from "~/context";

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

    test('y se intenta actualizar alguna debería fallar', async () => {
      reunionesRepo = new ReunionesRepo();
      repoTemas = new TemasRepo();
      reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'reunionCerrada' });
      temasGuardadosCerrada = await repoTemas.guardarTemas(reunionCerrada, [temaGenerico]);
      const requestBody = { abierta: reunionCerrada.abierta, id: reunionCerrada.id, temas: temasGuardadosCerrada };

      const response = await request(app).put('/api/reunion').send(requestBody);

      expect(response.status).toEqual(400);
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

  describe('al intentar crear una reunion', () => {
    beforeEach(() => {
      reunionesRepo = context.reunionesRepo;
    });
    test('si le defino el tipo roots en las configuraciones, se puede crear', async () => {
      const response = await request(app).post('/api/reunionDeRoots').send({ abierta: true, tipo: 'roots' });
      const reunionesActuales = await reunionesRepo.findAllWhereOpened(true);


      expect(response.statusCode).toEqual(200);
      expect(response.body.id).toEqual(reunionesActuales[0].id);
      expect(response.body.configuracion).toEqual(reunionesActuales[0].configuracion);
    });

    test('si le defino el tipo rapida en las configuraciones, se puede crear', async () => {
      const requestBody = {
        abierta: true,
        nombre: 'reunion generica',
        tema: 'unTema',
        autor: 'unPino',
        descripcion: 'una descripcion',
        urlDePresentacion: '',
        tipo: 'rapida',
      };

      const response = await request(app).post('/api/reunionDeRoots').send(requestBody);
      const reunionesActuales = await reunionesRepo.findAllWhereOpened(true);

      expect(response.statusCode).toEqual(200);
      expect(response.body.id).toEqual(reunionesActuales[0].id);
      expect(response.body.configuracion).toEqual(reunionesActuales[0].configuracion);
    });

    test('si le defino un tipo basura no debería crearla', async () => {
      const requestBody = {
        abierta: true,
        nombre: 'reunion generica',
        tema: 'unTema',
        autor: 'unPino',
        descripcion: 'una descripcion',
        urlDePresentacion: '',
        tipo: 'saraza',
      };

      const response = await request(app).post('/api/reunionDeRoots').send(requestBody);
      const reunionesActuales = await reunionesRepo.findAllWhereOpened(true);

      expect(response.statusCode).toEqual(400);
      expect(reunionesActuales).toEqual([]);

    });
  });
});
