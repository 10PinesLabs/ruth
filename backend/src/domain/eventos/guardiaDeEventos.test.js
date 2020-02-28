import { GuardiaDeEventos } from './guardiaDeEventos';

jest.mock('./repo');

describe('#guardiaDeEventos', () => {
  it('cuando llega un evento que tiene el evento anterior correcto es valido', async () => {
    const repoEventos = {
      guardarEvento: () => Promise.resolve(),
      conseguirUltimoEventoId: () => Promise.resolve(12),
    };

    const guardia = new GuardiaDeEventos(repoEventos);
    const evento = {
      ultimoEventoId: 12,
    };
    expect(await guardia.esValido(evento)).toBe(true);
  });

  it('cuando llega un evento que tiene el evento anterior en el pasado no es valido', async () => {
    const repoEventos = {
      guardarEvento: () => Promise.resolve(),
      conseguirUltimoEventoId: () => Promise.resolve(10),
    };

    const guardia = new GuardiaDeEventos(repoEventos);
    const evento = {
      ultimoEventoId: 8,
    };
    expect(await guardia.esValido(evento)).toBe(false);
  });
  it('cuando llega un evento y no existe evento anterior, el nuevo evento es valido', async () => {
    const repoEventos = {
      guardarEvento: () => Promise.resolve(),
      conseguirUltimoEventoId: () => Promise.resolve(undefined),
    };

    const guardia = new GuardiaDeEventos(repoEventos);
    const
      evento = {
        ultimoEventoId: null,
      };
    expect(await guardia.esValido(evento)).toBe(true);
  });
});
