import request from 'supertest';
import nodemailer from 'nodemailer';
import ReunionesRepo from '~/domain/reuniones/repo';
import app from '~/server';
import db from '~/database/models';
import TemasRepo from '~/domain/temas/repo';
import EventosRepo from '~/domain/eventos/repo';

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

const mockSendMail = jest.fn();
jest.mock('../login/estaLogueado', () => () => true);
jest.mock('nodemailer', () => ({ createTransport: jest.fn().mockImplementation(() => ({ sendMail: mockSendMail })) }));

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

function assertIdDelEventoYDeLaReunionDeDichoEventoSeanValidos(eventoDeLaApi, eventoEsperado) {
  expect(eventoDeLaApi.id).toEqual(eventoEsperado.dataValues.id);
  expect(eventoDeLaApi.reunionId).toEqual(eventoEsperado.dataValues.reunionId);
}

describe('para reuniones', () => {
  let reunionesRepo;
  let repoTemas;
  let reunionCerrada;
  let reunionAbierta;
  let temasGuardadosCerrada;
  let temasGuardadosAbierta;
  let eventosRepo;

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

    describe('si hay reuniones cerradas', () => {
      beforeEach(async () => {
        reunionesRepo = new ReunionesRepo();
        reunionCerrada = await reunionesRepo.create({ abierta: false, nombre: 'reunionCerrada' });
        repoTemas = new TemasRepo();
        temasGuardadosCerrada = await repoTemas.guardarTemas(reunionCerrada, [temaGenerico]);
      });

      test('y se intenta actualizar alguna debería fallar', async () => {
        const requestBody = { abierta: reunionCerrada.abierta, id: reunionCerrada.id, temas: temasGuardadosCerrada };

        const response = await request(app).put('/api/reunion').send(requestBody);

        expect(response.status).toEqual(400);
      });

      test('y se quiere reenviar el mail de minuta de alguna lo envia', async () => {
        const requestBody = {
          mail: 'leda.graham74@ethereal.email',
          temasReunion: temasGuardadosCerrada,
          idReunion: reunionCerrada.id,
        };

        const response = await request(app).put(`/api/reuniones/${reunionCerrada.id}/reenviarMailMinuta`).send(requestBody);

        expect(response.statusCode).toEqual(200);
        expect(nodemailer.createTransport).toHaveBeenCalledWith({
          host: 'smtp.ethereal.email',
          port: '587',
          secure: false,
          auth: { pass: 'gs9eQKqAMzPt2XWbs8', user: 'leda.graham74@ethereal.email' },
        });

        expect(mockSendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            from: 'Ruth <leda.graham74@ethereal.email>',
            subject: `Resumen reunionCerrada - ${fechaDeHoy.getDate()}-${fechaDeHoy.getMonth() + 1}-${fechaDeHoy.getFullYear()}`,
            to: 'leda.graham74@ethereal.email',
          }),
        );
      });
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
      eventosRepo = new EventosRepo();
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

    test('si se quiere obtener los eventos de una reunion cerrada sin eventos devuelve una lista vacia', async () => {
      const response = await request(app).get(`/api/reuniones/${reunionCerrada.id}/eventos`);

      expect(response.statusCode).toEqual(200);
      expect(response.body.eventos).toEqual([]);
    });

    describe('si la reunion cerrada y la reunion abierta tienen eventos', () => {
      let eventoReunionAbierta;
      let eventoReunionCerrada;

      beforeEach(async () => {
        const eventoReaccionarReunionCerrada = {
          reunionId: reunionCerrada.id,
          type: 'La reunion fue finalizada',
        };

        const eventoReaccionarReunionAbierta = {
          reunionId: reunionAbierta.id,
          type: 'Reaccionar',
          idTema: 44,
          nombre: '👍',
          usuario: { nombre: 'Pine Buena Onda', email: 'pine.buenaonda@10pines.com' },
        };

        eventoReunionCerrada = await eventosRepo.guardarEvento({
          evento: eventoReaccionarReunionCerrada,
          temaId: temasGuardadosCerrada[0].id,
          reunionId: reunionCerrada.id,
        });

        eventoReunionAbierta = await eventosRepo.guardarEvento({
          evento: eventoReaccionarReunionAbierta,
          temaId: temasGuardadosAbierta[0].id,
          reunionId: reunionAbierta.id,
        });
      });

      test('y se piden los eventos de la reunion abierta solo me devuelve los de ella', async () => {
        const response = await request(app).get(`/api/reuniones/${reunionAbierta.id}/eventos`);

        expect(response.statusCode).toEqual(200);
        assertIdDelEventoYDeLaReunionDeDichoEventoSeanValidos(response.body.eventos[0], eventoReunionAbierta);
        expect(response.body.eventos.length).toEqual(1);
      });

      test('y se piden los eventos de la reunion cerrada solo me devuelve los de ella', async () => {
        const response = await request(app).get(`/api/reuniones/${reunionCerrada.id}/eventos`);

        expect(response.statusCode).toEqual(200);
        assertIdDelEventoYDeLaReunionDeDichoEventoSeanValidos(response.body.eventos[0], eventoReunionCerrada);
        expect(response.body.eventos.length).toEqual(1);
      });

      test('si se cierra una reunion abierta con eventos y pido los eventos de esa reunion los devuelve', async () => {
        const requestBodyActualizar = {
          abierta: !reunionAbierta.abierta,
          id: reunionAbierta.id,
          temas: temasGuardadosAbierta,
        };

        await request(app).put('/api/reunion').send(requestBodyActualizar);

        const eventoReaccionarReunionCerrada = {
          reunionId: reunionAbierta.id,
          type: 'La reunion fue finalizada',
        };

        const evento2 = await eventosRepo.guardarEvento({
          evento: eventoReaccionarReunionCerrada,
          temaId: temasGuardadosAbierta[0].id,
          reunionId: reunionAbierta.id,
        });

        const response = await request(app).get(`/api/reuniones/${reunionAbierta.id}/eventos`);

        expect(response.statusCode).toEqual(200);
        assertIdDelEventoYDeLaReunionDeDichoEventoSeanValidos(response.body.eventos[0], eventoReunionAbierta);
        assertIdDelEventoYDeLaReunionDeDichoEventoSeanValidos(response.body.eventos[1], evento2);
        expect(response.body.eventos.length).toEqual(2);
      });
    });
  });
});
