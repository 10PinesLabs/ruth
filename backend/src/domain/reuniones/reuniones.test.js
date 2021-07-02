import request from 'supertest';
import { response } from 'express';
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

  test('si no hay reuniones cerradas devuelve una lista vacia', async () => {
    const reunionesCerradas = await request(app).get('/api/reuniones?estaAbierta=false');

    expect(response.statusCode).toEqual(200);
    expect(reunionesCerradas.body.reuniones.length).toEqual(0);
    expect(reunionesCerradas.body.reuniones).toEqual([]);
  });

  test('si hay reuniones cerradas las devuelve', async () => {
    const reunionesRepo = new ReunionesRepo();
    const repoTemas = new TemasRepo();
    const reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'saraza' });
    await repoTemas.guardarTemas(reunionCerrada, [temaGenerico]);

    const reunionesCerradas = await request(app).get('/api/reuniones?estaAbierta=false');

    // código rta
    expect(response.statusCode).toEqual(200);
    // reunion
    expect(reunionesCerradas.body.reuniones.length).toEqual(1);
    expect(reunionesCerradas.body.reuniones[0].id).toEqual(reunionCerrada.id);
    expect(reunionesCerradas.body.reuniones[0].abierta).toEqual(reunionCerrada.abierta);
    expect(reunionesCerradas.body.reuniones[0].nombre).toEqual(reunionCerrada.nombre);
    // tema de la reunion
    expect(reunionesCerradas.body.reuniones[0].temas[0].id).toEqual(temaGenerico.id);
    expect(reunionesCerradas.body.reuniones[0].temas[0].autor).toEqual(temaGenerico.autor);
    expect(reunionesCerradas.body.reuniones[0].temas[0].descripcion).toEqual(temaGenerico.descripcion);
    expect(reunionesCerradas.body.reuniones[0].temas[0].duracion).toEqual(temaGenerico.duracion);
    expect(reunionesCerradas.body.reuniones[0].temas[0].linkDePresentacion).toEqual(temaGenerico.linkDePresentacion);
    expect(reunionesCerradas.body.reuniones[0].temas[0].mailDelAutor).toEqual(temaGenerico.mailDelAutor);
    expect(reunionesCerradas.body.reuniones[0].temas[0].obligatoriedad).toEqual(temaGenerico.obligatoriedad);
    expect(reunionesCerradas.body.reuniones[0].temas[0].prioridad).toEqual(temaGenerico.prioridad);
    expect(reunionesCerradas.body.reuniones[0].temas[0].propuestas).toEqual(temaGenerico.propuestas);
    expect(reunionesCerradas.body.reuniones[0].temas[0].reunionId).toEqual(temaGenerico.reunionId);
    expect(reunionesCerradas.body.reuniones[0].temas[0].temasParaRepasar).toEqual(temaGenerico.temasParaRepasar);
    expect(reunionesCerradas.body.reuniones[0].temas[0].tipo).toEqual(temaGenerico.tipo);
    expect(reunionesCerradas.body.reuniones[0].temas[0].titulo).toEqual(temaGenerico.titulo);
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

  test('si hay reuniones abiertas las devuelve', async () => {
    const reunionesRepo = new ReunionesRepo();
    const repoTemas = new TemasRepo();
    const reunionAbierta = await reunionesRepo.create({ abierta: true, nombre: 'unaReunion' });
    await repoTemas.guardarTemas(reunionAbierta, [temaGenerico]);

    const reunionesCerradas = await request(app).get('/api/reuniones?estaAbierta=true');

    // código rta
    expect(response.statusCode).toEqual(200);
    // reunion
    expect(reunionesCerradas.body.reuniones.length).toEqual(1);
    expect(reunionesCerradas.body.reuniones[0].id).toEqual(reunionAbierta.id);
    expect(reunionesCerradas.body.reuniones[0].abierta).toEqual(reunionAbierta.abierta);
    expect(reunionesCerradas.body.reuniones[0].nombre).toEqual(reunionAbierta.nombre);
    // tema de la reunion
    expect(reunionesCerradas.body.reuniones[0].temas[0].id).toEqual(temaGenerico.id);
    expect(reunionesCerradas.body.reuniones[0].temas[0].autor).toEqual(temaGenerico.autor);
    expect(reunionesCerradas.body.reuniones[0].temas[0].descripcion).toEqual(temaGenerico.descripcion);
    expect(reunionesCerradas.body.reuniones[0].temas[0].duracion).toEqual(temaGenerico.duracion);
    expect(reunionesCerradas.body.reuniones[0].temas[0].linkDePresentacion).toEqual(temaGenerico.linkDePresentacion);
    expect(reunionesCerradas.body.reuniones[0].temas[0].mailDelAutor).toEqual(temaGenerico.mailDelAutor);
    expect(reunionesCerradas.body.reuniones[0].temas[0].obligatoriedad).toEqual(temaGenerico.obligatoriedad);
    expect(reunionesCerradas.body.reuniones[0].temas[0].prioridad).toEqual(temaGenerico.prioridad);
    expect(reunionesCerradas.body.reuniones[0].temas[0].propuestas).toEqual(temaGenerico.propuestas);
    expect(reunionesCerradas.body.reuniones[0].temas[0].reunionId).toEqual(temaGenerico.reunionId);
    expect(reunionesCerradas.body.reuniones[0].temas[0].temasParaRepasar).toEqual(temaGenerico.temasParaRepasar);
    expect(reunionesCerradas.body.reuniones[0].temas[0].tipo).toEqual(temaGenerico.tipo);
    expect(reunionesCerradas.body.reuniones[0].temas[0].titulo).toEqual(temaGenerico.titulo);
  });
});
