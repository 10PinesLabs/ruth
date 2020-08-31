import ReunionController from './controller';

const mockReunionesRepo = (mockUltimaReunion) => {
  const repoMock = {};
  const ultimaReunion = { ...mockUltimaReunion, temas: [] };
  ultimaReunion.update = jest.fn().mockReturnValue();
  repoMock.findLastCreated = () => ultimaReunion;
  return repoMock;
};

const mockReunionesRepoUltimaCreadaCerrada = mockReunionesRepo({ abierta: false });
const mockReunionesRepoUltimaCreadaAbierta = mockReunionesRepo({ abierta: true });

const mockResponse = () => {
  const res = {};
  res.sendStatus = jest.fn().mockReturnValue(res);
  return res;
};

const mockNotificador = () => ({
  notificarOwnersDeActionItemsDeReunion: () => {},
});

const mockMailSender = () => {};

const mockRequest = (data) => ({ body: { temas: [], abierta: false, ...data } });

describe('reunion controller', () => {
  test('si se intenta marcar como cerrada una reunion que ya lo esta devuelve 400', async () => {
    const controller = ReunionController({ reunionesRepo: mockReunionesRepoUltimaCreadaCerrada });
    const req = mockRequest({ abierta: false });
    const res = mockResponse();

    await controller.actualizar(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });

  test('si se intenta marcar como abierta una reunion que ya lo esta devuelve 400', async () => {
    const controller = ReunionController({ reunionesRepo: mockReunionesRepoUltimaCreadaAbierta });
    const req = mockRequest({ abierta: true });
    const res = mockResponse();

    await controller.actualizar(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(400);
  });

  test('si la reunion se actualiza exitosamente se devuelve 200', async () => {
    const repoReuniones = mockReunionesRepoUltimaCreadaAbierta;
    const controller = ReunionController({ reunionesRepo: repoReuniones }, mockNotificador(), mockMailSender);
    const req = mockRequest({ abierta: false });
    const res = mockResponse();

    await controller.actualizar(req, res);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
    expect(repoReuniones.findLastCreated().update).toHaveBeenCalledWith({ abierta: false });
  });
});
