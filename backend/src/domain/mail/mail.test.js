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

describe('para mails', () => {
  let reunionesRepo;
  let repoTemas;
  let reunionCerrada;
  let temasGuardadosCerrada;

  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
    reunionesRepo = new ReunionesRepo();
    reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'reunionCerrada' });
    repoTemas = new TemasRepo();
    temasGuardadosCerrada = await repoTemas.guardarTemas(reunionCerrada, [temaGenerico]);
  });

  describe('si se pide que reenvie el mail de minuta', () => {
    test('lo envia', async () => {
      const requestBody = { mail: process.env.MAIL_DESTINATION, temasReunion: temasGuardadosCerrada, idReunion: reunionCerrada.id };

      const response = await request(app).put(`/api/reuniones/${reunionCerrada.id}/reenviarMailMinuta`).send(requestBody);

      expect(response.statusCode).toEqual(200);
    });
  });
});
