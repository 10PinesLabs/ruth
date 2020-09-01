import actualizarTemaTratadoEnRoots from './actualizadorMinutaRoots';

const mockTema = {
  id: 4,
};

const mockRequester = {
  patch: jest.fn(),
};

describe('Al actualizar un tema en roots', () => {
  test('el primer argumento es la url de la api',async () => {
    await actualizarTemaTratadoEnRoots(mockRequester, mockTema);
    expect(mockRequester.patch.mock.calls[0][0]).toBe(`${process.env.TEMAS_ROOTS_HOST}/api/v2/temas/4/temaDeMinuta?apiKey=${process.env.TEMAS_ROOTS_API_KEY}`);
  });

  test('hace patch a que el tema fue tratado',async () => {
    await actualizarTemaTratadoEnRoots(mockRequester, mockTema);
    expect(mockRequester.patch.mock.calls[0][1]).toEqual({ fueTratado: true });
  });
});
