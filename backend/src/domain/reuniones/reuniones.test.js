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

describe('para reuniones cerradas', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => fechaDeHoy.toISOString());
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('si no hay reuniones cerradas devuelve una lista vacia', async () => {
    const reunionesCerradas = await request(app).get('/api/reuniones?estaAbierta=false');

    expect(response.statusCode).toEqual(200);
    expect(reunionesCerradas.body.reuniones.length).toEqual(0);
    expect(reunionesCerradas.body.reuniones).toEqual([]);
  });
});


describe('para reuniones abiertas', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('si no hay reuniones abiertas devuelve una lista vacia', async () => {
    const reunionesCerradas = await request(app).get('/api/reuniones?estaAbierta=true');

    expect(response.statusCode).toEqual(200);
    expect(reunionesCerradas.body.reuniones.length).toEqual(0);
    expect(reunionesCerradas.body.reuniones).toEqual([]);
  });
});

describe('para reuniones abiertas y cerradas', () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  test('si hay reuniones abiertas y cerradas y pido las cerradas', async () => {
    const reunionesRepo = new ReunionesRepo();
    const repoTemas = new TemasRepo();
    const reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'reunionCerrada' });
    const reunionAbierta = await reunionesRepo.create({ abierta: true, nombre: 'reunionAbierta' });

    const temasGuardados = await repoTemas.guardarTemas(reunionCerrada, [temaGenerico]);
    await repoTemas.guardarTemas(reunionAbierta, [temaGenerico]);


    const response = await request(app).get('/api/reuniones?estaAbierta=false');

    expect(response.statusCode).toEqual(200);
    expect(response.body.reuniones.length).toEqual(1);
    expect(response.body.reuniones[0].id).toEqual(reunionCerrada.id);
    assertTemaValido(reunionCerrada, response, temasGuardados[0]);
  });

  test('si hay reuniones abiertas y cerradas y pido las abiertas', async () => {
    const reunionesRepo = new ReunionesRepo();
    const repoTemas = new TemasRepo();
    const reunionAbierta = await reunionesRepo.create({ abierta: true, nombre: 'reunionAbierta' });
    const reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'reunionCerrada' });
    const temasGuardados = await repoTemas.guardarTemas(reunionAbierta, [temaGenerico]);
    await repoTemas.guardarTemas(reunionCerrada, [temaGenerico]);

    const response = await request(app).get('/api/reuniones?estaAbierta=true');

    expect(response.statusCode).toEqual(200);
    expect(response.body.reuniones.length).toEqual(1);
    expect(response.body.reuniones[0].id).toEqual(reunionAbierta.id);
    assertTemaValido(reunionAbierta, response, temasGuardados[0]);
  });
});
