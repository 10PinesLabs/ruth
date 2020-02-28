import { getTemasRoots } from './votacionDeRoots';
import fixture from './temas-fixture.json';

import VotacionCliente from './votacionDeRootsCliente';

jest.mock('./votacionDeRootsCliente', () => ({
  getTemasRoots: jest.fn(),
}));


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
