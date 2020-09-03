import { getTemasRoots } from './votacionDeRoots';
import fixture from './temas-fixture.json';

import VotacionCliente from './votacionDeRootsCliente';

jest.mock('./votacionDeRootsCliente', () => ({
  getTemasRoots: jest.fn(),
}));

const { actualizarMinutaDeTema } = jest.requireActual('./votacionDeRootsCliente');

const mockTema = {
  votacionDeRootsId: 4,
};

const mockRequester = {
  patch: jest.fn().mockResolvedValue(204),
};

describe('#getTemasRoots', () => {
  describe('con un cliente mockeado', () => {
    let respuesta;
    beforeEach(() => {
      VotacionCliente.getTemasRoots.mockImplementation(() => Promise.resolve(respuesta));
    });

    describe('si no hay temas', () => {
      beforeEach(() => {
        respuesta = [];
      });

      it('devuelve una lista vacia', () => expect(getTemasRoots()).resolves.toEqual([]));
    });


    describe('cuando hay un tema bien formado', () => {
      const unBuenTema = fixture[0];
      beforeEach(() => {
        respuesta = [unBuenTema];
      });

      it('devuelve ese mismo tema', () => getTemasRoots().then((temas) => {
        const [primerTema, ...resto] = temas;

        // Nota: Podríamos asertar sobre más valores?
        for (const key of ['tipo', 'titulo', 'descripcion', 'duracion', 'autor', 'obligatoriedad',
          'linkDePresentacion', 'cantidadDeMinutosDelTema']) {
          expect(primerTema).toHaveProperty(key);
        }
        expect(resto.length).toEqual(0);
      }));
    });

    describe('cuando hay un tema con un atributo de más', () => {
      const unBuenTema = fixture[0];
      beforeEach(() => {
        respuesta = [
          { ...unBuenTema, algoDeMas: 300 },
        ];
      });

      it('devuelve el tema sanitizado', () => expect(getTemasRoots()).resolves.toEqual(
        expect.not.objectContaining({ algoDeMas: expect.anything() }),
      ));
    });
  });
});


describe('Al actualizar un tema en roots', () => {
  test('el primer argumento es la url de la api', async () => {
    await actualizarMinutaDeTema(mockRequester, mockTema);
    expect(mockRequester.patch.mock.calls[0][0]).toBe(`${process.env.TEMAS_ROOTS_HOST}/api/v2/temas/4/temaDeMinuta?apiKey=${process.env.TEMAS_ROOTS_API_KEY}`);
  });

  test('hace patch a que el tema fue tratado', async () => {
    await actualizarMinutaDeTema(mockRequester, mockTema);
    expect(mockRequester.patch.mock.calls[0][1]).toEqual({ fueTratado: true });
  });
});
