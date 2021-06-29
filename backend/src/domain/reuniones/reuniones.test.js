import ReunionesRepo from '~/domain/reuniones/repo';

jest.mock('./repo');

describe('#getReunionesCerradas', () => {
  describe('si no hay reuniones cerradas', () => {
    const reunionesRepo = new ReunionesRepo();
    it('devuelve una lista vacia', async () => expect(await reunionesRepo.findAllClosed()).resolves.toEqual([]));
  });
});
