import { actualizarTemaTratadoEnRoots } from './actualizadorMinutaRoots';

const mockTema = {
  id: 4,
};

const mockRequester = {
  patch: jest.fn(),
};

describe('Al actualizar un tema en roots', () => {
  test('el primer argumento es la url de la api', () => {
    actualizarTemaTratadoEnRoots(mockRequester, mockTema);
    expect(mockRequester.patch.mock.calls[0][0]).toBe('/api/v1/temas/4/temaDeMinuta');
  });

  test('hace patch a que el tema fue tratado', () => {
    actualizarTemaTratadoEnRoots(mockRequester, mockTema);
    expect(mockRequester.patch.mock.calls[0][1]).toEqual({ fueTratado: true });
  });
});
